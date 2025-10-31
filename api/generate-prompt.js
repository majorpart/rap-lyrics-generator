module.exports = async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    console.log('API handler called:', req.method, req.url);
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return res.status(200).end();
    }
    
    // 只允许POST请求
    if (req.method !== 'POST') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('API request received:', req.method, req.url);
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        
        const { yourName, partnerName, role, wordCount, style, additionalRequirements } = req.body;

        // 验证必需参数
        if (!yourName || !partnerName || !role || !wordCount || !style) {
            console.log('Missing required fields:', { yourName, partnerName, role, wordCount, style });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 从环境变量获取API密钥
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error('API key not configured in environment variables');
            return res.status(500).json({ error: 'API key not configured' });
        }
        
        console.log('API key found, proceeding with request');

        const apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';

        // 构建提示词
        const basePrompt = "You are an experienced American wedding officiant who is very skilled at helping newlyweds write their wedding vows. Please write a wedding vow based on the following requirements. No process is needed. Just output the result directly to me. The language is English.";
        
        const requirements = [
            `1.My name is ${yourName}`,
            `2.The name of my partner is ${partnerName}`,
            `3.I am the ${role}`,
            `4.${style} style`,
            additionalRequirements ? `5.${additionalRequirements}` : '',
            `6.The word count is ${wordCount} words`
        ].filter(req => req).join('\n');

        const fullPrompt = `${basePrompt}\n\n${requirements}`;

        const requestBody = {
            model: "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
            messages: [
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        };

        console.log('Making request to SiliconFlow API...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log('API response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API request failed:', response.status, response.statusText, errorText);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API response received successfully');
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            console.log('Returning successful response');
            return res.status(200).json({ 
                success: true, 
                vows: data.choices[0].message.content 
            });
        } else {
            console.error('Invalid API response format:', JSON.stringify(data, null, 2));
            throw new Error('Invalid API response format');
        }

    } catch (error) {
        console.error('Error generating wedding vows:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error',
            timestamp: new Date().toISOString()
        });
    }
}