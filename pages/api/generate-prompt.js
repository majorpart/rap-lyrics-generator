// Helper function to format rate limit error messages
function formatRateLimitError(errorData) {
    let message = 'The AI model is currently rate-limited. ';
    
    if (errorData?.error?.metadata?.raw) {
        const rawMessage = errorData.error.metadata.raw;
        if (rawMessage.includes('temporarily rate-limited')) {
            message += 'Please wait a moment and try again. ';
        }
        if (rawMessage.includes('add your own key')) {
            message += 'For better rate limits, consider adding your own OpenRouter API key at https://openrouter.ai/settings/integrations';
        }
    } else {
        message += 'Please try again in a few moments.';
    }
    
    return message;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Only POST requests are supported.' });

    try {
        const { topic, contentRequirements, rhythmRequirements, otherRequirements, referenceLyrics } = req.body || {};
        if (!topic || !contentRequirements) {
            console.error('Missing required fields:', { topic: !!topic, contentRequirements: !!contentRequirements });
            return res.status(400).json({ error: 'Missing required fields: topic and contentRequirements are required' });
        }

        // Support both OPENROUTER_API_KEY and API_KEY for backward compatibility
        const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            console.error('API key not configured');
            return res.status(500).json({ error: 'API key not configured. Please set OPENROUTER_API_KEY (or API_KEY) environment variable.' });
        }

        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

        const defaultRhythmRequirements = `- Use a rhyming structure of AABB or ABAB.\n- Try to use internal rhymes and polysyllabic rhymes as much as possible.\n- Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.`;
        const defaultOtherRequirements = `- The lyrics must contain a brief storyline.\n- There must be a powerful "punchline" in the last four lines to serve as the conclusion.\n- Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]\n- Avoid using clichés and strive for originality and impact.`;

        const basePrompt = `# Character Profile\nYou are a highly talented and globally renowned rapper, skilled in various styles. Your lyrics are known for their sharp rhymes, clever puns, and profound storytelling. \n\n# Task Description\nGenerate rap lyrics based on the provided theme, style and keywords by the user. \n\n# Specific Requirements and Constraints`;

        const requirements = [
            `1. **Topic:** ${topic}`,
            `2. **Content Requirements:** ${contentRequirements}`,
            rhythmRequirements ? `3. **Rhythm Requirements:** ${rhythmRequirements}` : `3. **Rhythm Requirements:** \n${defaultRhythmRequirements}`,
            otherRequirements ? `4. **Other Requirements:** ${otherRequirements}` : `4. **Other Requirements:** \n${defaultOtherRequirements}`,
            referenceLyrics ? `5. **Reference Lyrics:** ${referenceLyrics}` : ''
        ].filter(Boolean).join('\n\n');

        // Add instruction to reply with lyrics content only
        const instruction = '\n\nJust reply me with the lyrics content directly. There\'s no need to include any other unnecessary things in your reply.';
        const fullPrompt = `${basePrompt}\n\n${requirements}${instruction}`;

        const requestBody = {
            model: 'deepseek/deepseek-chat-v3-0324',
            messages: [{ role: 'user', content: fullPrompt }],
            max_tokens: 1000,
            temperature: 0.7
        };

        // Get site URL from environment or use default
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-rap-lyrics-generator.momo-test.com';
        const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Rap Lyrics Generator';

        // Retry configuration for rate limiting
        const maxRetries = 3;
        const baseDelay = 2000; // 2 seconds base delay
        let lastError = null;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                // Create abort controller for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout for AI generation

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`,
                            'HTTP-Referer': siteUrl, // Optional. Site URL for rankings on openrouter.ai
                            'X-Title': siteName // Optional. Site title for rankings on openrouter.ai
                        },
                        body: JSON.stringify(requestBody),
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        const errorText = await response.text().catch(() => 'Unknown error');
                        let errorData;
                        try {
                            errorData = JSON.parse(errorText);
                        } catch {
                            errorData = { error: { message: errorText } };
                        }

                        // Handle 429 rate limiting with retry
                        if (response.status === 429) {
                            lastError = new Error(formatRateLimitError(errorData));
                            
                            // If not the last attempt, wait and retry
                            if (attempt < maxRetries) {
                                const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
                                console.log(`Rate limited (429). Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})...`);
                                await new Promise(resolve => setTimeout(resolve, delay));
                                continue; // Retry
                            }
                            
                            // Last attempt failed, throw formatted error
                            throw lastError;
                        }

                        // Handle other errors
                        throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
                    }

                    const data = await response.json();
                    if (data.choices && data.choices[0] && data.choices[0].message) {
                        return res.status(200).json({ success: true, lyrics: data.choices[0].message.content });
                    }
                    throw new Error('Invalid API response format: missing choices or message');
                } catch (fetchError) {
                    clearTimeout(timeoutId);
                    
                    if (fetchError.name === 'AbortError') {
                        throw new Error('Request timeout: The AI generation took too long. Please try again.');
                    }
                    if (fetchError.message.includes('ECONNREFUSED') || fetchError.message.includes('ENOTFOUND')) {
                        throw new Error('Network error: Unable to connect to AI service. Please check your connection and try again.');
                    }
                    
                    // If it's a rate limit error and we haven't exhausted retries, continue to retry
                    if (fetchError.message.includes('429') || fetchError.message.includes('rate-limited')) {
                        lastError = fetchError;
                        if (attempt < maxRetries) {
                            const delay = baseDelay * Math.pow(2, attempt);
                            console.log(`Rate limited. Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})...`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                    }
                    
                    throw fetchError;
                }
            } catch (attemptError) {
                // If this is the last attempt, throw the error
                if (attempt === maxRetries) {
                    throw attemptError;
                }
                // Otherwise, continue to next retry
                lastError = attemptError;
            }
        }

        // If we get here, all retries failed
        throw lastError || new Error('Failed to generate lyrics after multiple attempts.');
    } catch (error) {
        console.error('Error in generate-prompt API:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error', 
            timestamp: new Date().toISOString() 
        });
    }
}


