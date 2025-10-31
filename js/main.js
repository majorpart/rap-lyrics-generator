// AI Wedding Vows Generator - Main JavaScript File
class WeddingVowsApp {
    constructor() {
        this.isGenerating = false;
        this.apiUrl = '/api/generate-prompt';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupGenerateButton();
        this.setupFAQAccordion();
        this.setupRhythmToggle();
        this.generateTestimonials();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Form input validation
        this.setupFormInputListeners();
    }

    // Setup Form Input Listeners
    setupFormInputListeners() {
        const form = document.getElementById('weddingVowsForm');
        if (form) {
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    this.validateForm();
                });
                input.addEventListener('change', () => {
                    this.validateForm();
                });
            });
        }
    }

    // Form Validation Setup
    setupFormValidation() {
        this.validateForm();
    }

    // Validate Form
    validateForm() {
        const form = document.getElementById('weddingVowsForm');
        if (!form) return;

        const topic = form.querySelector('#topic')?.value.trim();
        const contentRequirements = form.querySelector('#contentRequirements')?.value.trim();

        const isValid = topic && contentRequirements;
        
        this.updateGenerateButton(isValid);
        return isValid;
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    // Smooth Scrolling Setup
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('data-section');
                
                if (targetId) {
                    e.preventDefault();
                    
                    if (targetId === 'top') {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            const offsetTop = targetElement.offsetTop - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }

                    // Update active nav link
                    this.updateActiveNavLink(link);

                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });
    }

    // Update Active Navigation Link
    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-gray-300');
        });
        
        activeLink.classList.remove('text-gray-300');
        activeLink.classList.add('text-white');
    }

    // Generate Button Setup
    setupGenerateButton() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                if (this.validateForm() && !this.isGenerating) {
                    this.generateWeddingVows();
                }
            });
        }
    }

    // Update Generate Button State
    updateGenerateButton(isValid) {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            if (isValid) {
                generateBtn.disabled = false;
                generateBtn.classList.remove('disabled:cursor-not-allowed');
            } else {
                generateBtn.disabled = true;
                generateBtn.classList.add('disabled:cursor-not-allowed');
            }
        }
    }

    // Generate Rap Lyrics
    async generateWeddingVows() {
        if (this.isGenerating) {
            return;
        }

        this.isGenerating = true;
        this.ensureButtonStructure();
        this.updateGenerateButton(false);
        this.showLoading();

        try {
            const formData = this.collectFormData();
            const lyrics = await this.callAPI(formData);
            this.completeProgress();
            this.displayVows(lyrics);
            
            this.isGenerating = false;
            this.updateGenerateButton(true);
            this.hideLoading();
        } catch (error) {
            console.error('Error generating rap lyrics:', error);
            this.showError(error.message || 'API error. Please try again later.');
            
            this.isGenerating = false;
            this.updateGenerateButton(true);
            this.hideLoading();
        }
    }

    // Collect Form Data
    collectFormData() {
        const form = document.getElementById('weddingVowsForm');
        const formData = new FormData(form);
        
        return {
            topic: formData.get('topic'),
            contentRequirements: formData.get('contentRequirements'),
            rhythmRequirements: this.collectRhythmRequirements(form),
            otherRequirements: this.collectOtherRequirements(form),
            referenceLyrics: formData.get('referenceLyrics') || ''
        };
    }

    // Collect Rhythm Requirements (textarea, default fallback)
    collectRhythmRequirements(form) {
        const value = form.querySelector('#rhythmRequirements')?.value.trim();
        if (!value) {
            return `- Use a rhyming structure of AABB or ABAB.
- Try to use internal rhymes and polysyllabic rhymes as much as possible.
- Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.`;
        }
        return value;
    }

    // Collect Other Requirements
    collectOtherRequirements(form) {
        const otherRequirements = form.querySelector('#otherRequirements')?.value.trim();
        
        // 如果用户没有输入，使用默认值
        if (!otherRequirements) {
            return `- The lyrics must contain a brief storyline.
- There must be a powerful "punchline" in the last four lines to serve as the conclusion.
- Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
- Avoid using clichés and strive for originality and impact.`;
        }
        
        return otherRequirements;
    }

    // Call API
    async callAPI(formData) {
        const requestBody = {
            topic: formData.topic,
            contentRequirements: formData.contentRequirements,
            rhythmRequirements: formData.rhythmRequirements || null,
            otherRequirements: formData.otherRequirements || null,
            referenceLyrics: formData.referenceLyrics || null
        };

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success && data.lyrics) {
            return data.lyrics;
        } else {
            throw new Error(data.error || 'Invalid API response format');
        }
    }

    // Display Generated Lyrics
    displayVows(lyrics) {
        const vowsDisplay = document.getElementById('vowsDisplay');
        const copyBtn = document.getElementById('copyBtn');
        
        if (vowsDisplay) {
            vowsDisplay.innerHTML = `<div class="text-gray-900 leading-relaxed prose max-w-none whitespace-pre-line">${lyrics}</div>`;
        }
        
        if (copyBtn) {
            copyBtn.classList.remove('hidden');
            // Remove old event listeners and add new one
            const newCopyBtn = copyBtn.cloneNode(true);
            copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
            newCopyBtn.addEventListener('click', () => {
                this.copyToClipboard(lyrics);
            });
        }
    }

    // Copy to Clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showSuccess('Copy successful!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showSuccess('Copy successful!');
        }
    }

    // Setup FAQ Accordion
    setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer && icon) {
                question.addEventListener('click', () => {
                    const isOpen = !answer.classList.contains('hidden');
                    
                    if (isOpen) {
                        answer.classList.add('hidden');
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        answer.classList.remove('hidden');
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }

    // Setup Rhythm Requirements Toggle
    setupRhythmToggle() {
        const rhythmToggle = document.getElementById('rhythmToggle');
        const rhythmOptions = document.getElementById('rhythmOptions');
        const rhythmIcon = document.getElementById('rhythmIcon');
        
        if (rhythmToggle && rhythmOptions && rhythmIcon) {
            rhythmToggle.addEventListener('click', () => {
                const isOpen = !rhythmOptions.classList.contains('hidden');
                
                if (isOpen) {
                    rhythmOptions.classList.add('hidden');
                    rhythmIcon.style.transform = 'rotate(0deg)';
                } else {
                    rhythmOptions.classList.remove('hidden');
                    rhythmIcon.style.transform = 'rotate(180deg)';
                }
            });
        }
    }

    // Generate Testimonials
    generateTestimonials() {
        const testimonials = [
            {
                text: "I dropped my Topic and vibes, and the AI delivered clean, hard-hitting rap lyrics in seconds. Flow was on point — just needed minor tweaks to fit my beat.",
                name: "Nova & Crew",
                role: "Independent Artist",
                avatar: "assets/images/rap-lyrics-generator (1).webp"
            },
            {
                text: "The rhythm controls are clutch. Setting AABB + 8–12 syllables gave me consistent cadence across verses. Perfect starting point for my track hook.",
                name: "Jules",
                role: "Producer / Writer",
                avatar: "assets/images/rap-lyrics-generator (2).webp"
            },
            {
                text: "I added a short storyline and asked for a strong punchline — the generator built a coherent narrative with memorable closing bars. Highly recommend.",
                name: "Kira",
                role: "Hip-hop Vocalist",
                avatar: "assets/images/rap-lyrics-generator (3).webp"
            },
            {
                text: "As a non-native writer, this helped me avoid clichés and still keep the slang natural. Great tool for authentic \"rap lyrics\" without sounding generic.",
                name: "Leo",
                role: "Songwriter",
                avatar: "assets/images/rap-lyrics-generator (4).webp"
            },
            {
                text: "I used reference lyrics from a classic track — the AI caught the vibe without copying. It felt like my style, just faster.",
                name: "Taylor",
                role: "Recording Artist",
                avatar: "assets/images/rap-lyrics-generator (5).webp"
            },
            {
                text: "We write for multiple genres. This doubles as a solid song lyrics generator when we switch out of rap. Versatile and reliable.",
                name: "María & Carlos",
                role: "Writing Duo",
                avatar: "assets/images/rap-lyrics-generator (6).webp"
            },
            {
                text: "Internal rhymes + multisyllabic suggestions elevated my verse quality. The punchlines landed — my audience noticed the upgrade.",
                name: "LISAN",
                role: "Battle Rap Enthusiast",
                avatar: "assets/images/rap-lyrics-generator (7).webp"
            },
            {
                text: "Deadlines are tight; this saves hours. I generate, personalize lines with my references, and the track is ready to record.",
                name: "Rae & Mark",
                role: "Studio Team",
                avatar: "assets/images/rap-lyrics-generator (8).webp"
            },
            {
                text: "Great for ideation. When I'm stuck, I feed it the topic and tone — it returns angles I wouldn't have thought of.",
                name: "Ami",
                role: "Lyricist",
                avatar: "assets/images/rap-lyrics-generator (9).webp"
            }
        ];

        // Duplicate testimonials multiple times for seamless scrolling
        const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
        
        // Create testimonial card HTML
        const createTestimonialCard = (testimonial) => `
            <div class="testimonial-card rounded-2xl p-6 hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <p class="text-gray-800 mb-6 leading-relaxed text-spacing text-base">${testimonial.text}</p>
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="text-gray-900 font-semibold text-base">${testimonial.name}</h4>
                        <p class="text-gray-700 text-sm">${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Distribute testimonials across three columns
        const column1 = document.getElementById('testimonialsColumn1');
        const column2 = document.getElementById('testimonialsColumn2');
        const column3 = document.getElementById('testimonialsColumn3');
        
        if (column1 && column2 && column3) {
            // Distribute testimonials to columns (every 3rd item goes to each column)
            const column1Testimonials = allTestimonials.filter((_, index) => index % 3 === 0);
            const column2Testimonials = allTestimonials.filter((_, index) => index % 3 === 1);
            const column3Testimonials = allTestimonials.filter((_, index) => index % 3 === 2);
            
            column1.innerHTML = column1Testimonials.map(createTestimonialCard).join('');
            column2.innerHTML = column2Testimonials.map(createTestimonialCard).join('');
            column3.innerHTML = column3Testimonials.map(createTestimonialCard).join('');
        }
    }

    // Show Loading with Progress Bar Above Button
    showLoading() {
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const buttonText = document.getElementById('buttonText');
        const generateBtn = document.getElementById('generateBtn');
        
        // Show progress bar above button
        if (progressContainer) {
            progressContainer.classList.remove('hidden');
        }
        
        // Reset progress bar
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        // Update button text and make it gray
        if (buttonText) {
            buttonText.textContent = 'Generating your rap lyrics...';
        }
        
        // Change button to gray color
        if (generateBtn) {
            generateBtn.classList.remove('btn-primary');
            generateBtn.classList.add('bg-gray-500', 'hover:bg-gray-600');
        }
        
        // Start progress animation
        this.startProgressAnimation();
    }

    // Hide Loading
    hideLoading() {
        const progressContainer = document.getElementById('progressContainer');
        const buttonText = document.getElementById('buttonText');
        const generateBtn = document.getElementById('generateBtn');
        
        // Hide progress bar
        if (progressContainer) {
            progressContainer.classList.add('hidden');
        }
        
        // Reset button text and color
        if (buttonText) {
            buttonText.textContent = 'Generate Rap Lyrics';
        }
        
        // Restore button color
        if (generateBtn) {
            generateBtn.classList.add('btn-primary');
            generateBtn.classList.remove('bg-gray-500', 'hover:bg-gray-600');
        }
        
        // Stop progress animation
        this.stopProgressAnimation();
    }
    
    // Ensure Button Structure is Complete
    ensureButtonStructure() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            // Check if button has the correct structure
            const progressContainer = generateBtn.querySelector('#progressContainer');
            const buttonText = generateBtn.querySelector('#buttonText');
            
            if (!progressContainer || !buttonText) {
                // Restore complete button structure
                generateBtn.innerHTML = `
                    <!-- Progress Bar Inside Button -->
                    <div id="progressContainer" class="w-full mb-2 hidden">
                        <div class="w-full bg-gray-600 rounded-full h-1">
                            <div id="progressBar" class="bg-gradient-to-r from-orange-500 to-orange-400 h-1 rounded-full transition-all duration-300 ease-out" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <span id="buttonText">Generate Rap Lyrics</span>
                `;
            }
        }
    }

    // Start Progress Animation
    startProgressAnimation() {
        this.progressInterval = setInterval(() => {
            const progressBar = document.getElementById('progressBar');
            
            if (progressBar) {
                const currentWidth = parseFloat(progressBar.style.width) || 0;
                let newWidth = currentWidth;
                let increment = 4.5;
                
                // Optimized progress logic - reach 90% in about 20 seconds
                if (currentWidth < 20) {
                    increment = 5.0;
                } else if (currentWidth < 50) {
                    increment = 4.5;
                } else if (currentWidth < 80) {
                    increment = 4.0;
                } else if (currentWidth < 90) {
                    increment = 3.5;
                } else if (currentWidth < 95) {
                    increment = 2.0;
                } else {
                    return;
                }
                
                newWidth = Math.min(currentWidth + increment, 95);
                progressBar.style.width = newWidth + '%';
            }
        }, 400);
    }

    // Stop Progress Animation
    stopProgressAnimation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    // Complete Progress (called when API finishes)
    completeProgress() {
        const progressBar = document.getElementById('progressBar');
        
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Stop the animation
        this.stopProgressAnimation();
    }

    // Show Success Message
    showSuccess(message) {
        const toast = document.getElementById('successToast');
        if (toast) {
            toast.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    }

    // Show Error Message
    showError(message) {
        const toast = document.getElementById('errorToast');
        const errorMessage = document.getElementById('errorMessage');
        if (toast && errorMessage) {
            errorMessage.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 5000);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weddingVowsApp = new WeddingVowsApp();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Page is now visible');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    console.log('Window resized');
});