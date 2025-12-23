// ENHANCED ANIMATIONS SYSTEM

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// RIPPLE EFFECT FOR BUTTONS
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons with class 'ripple-effect'
document.querySelectorAll('.ripple-effect').forEach(button => {
    button.addEventListener('click', createRipple);
});

// TYPING EFFECT FOR HERO
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                const cursor = document.querySelector('.typing-cursor');
                if (cursor) {
                    cursor.style.display = 'none';
                }
            }, 1000);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        setTimeout(() => {
            typeWriter(typingElement, text, 80);
        }, 300);
    }
});

// ENHANCED INTERSECTION OBSERVER WITH STAGGER
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('[data-animate]');
            
            elements.forEach((element, index) => {
                const delay = element.getAttribute('data-animate-delay') || (index * 100);
                const animationType = element.getAttribute('data-animate');
                
                setTimeout(() => {
                    element.style.animation = `${animationType} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
                    element.style.opacity = '1';
                }, delay);
            });
            
            // Unobserve after animation
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with data-animate-section
document.querySelectorAll('[data-animate-section]').forEach(section => {
    sectionObserver.observe(section);
});

// DEMO TABS WITH SMOOTH TRANSITIONS
const demoTabs = document.querySelectorAll('.demo-tab');
const demoContents = document.querySelectorAll('.demo-content');

demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Remove active class from all tabs and contents with animation
        demoTabs.forEach(t => {
            t.classList.remove('active');
        });
        
        demoContents.forEach(c => {
            if (c.classList.contains('active')) {
                c.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    c.classList.remove('active');
                    c.style.animation = '';
                }, 300);
            }
        });

        // Add active class to clicked tab and corresponding content
        setTimeout(() => {
            tab.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-demo`);
            targetContent.classList.add('active');
        }, 300);
    });
});

// DEMO FUNCTIONALITY - Generate Content
const generateBtn = document.getElementById('generateBtn');
const generateInput = document.getElementById('generateInput');
const generateOutput = document.getElementById('generateOutput');

const generateResponses = [
    "Subject: Introducing Our Revolutionary New Product\n\nDear Valued Customer,\n\nWe're thrilled to announce the launch of our latest innovation that will transform the way you work. Our new product combines cutting-edge technology with user-friendly design to deliver unprecedented results.\n\nKey benefits include:\n• 50% increase in productivity\n• Seamless integration with existing tools\n• 24/7 customer support\n\nWe'd love to schedule a demo to show you how this can benefit your organization.\n\nBest regards,\nThe Team",
    "Blog Post: 10 Proven Strategies for Better Writing\n\nWriting is both an art and a science. Whether you're crafting a business email or a creative piece, these strategies will elevate your writing:\n\n1. Start with a clear outline\n2. Write concisely and avoid jargon\n3. Use active voice whenever possible\n4. Edit ruthlessly\n5. Read your work aloud\n6. Get feedback from others\n7. Study great writers\n8. Practice daily\n9. Embrace revisions\n10. Never stop learning\n\nImplementing these techniques will dramatically improve your writing quality and impact.",
    "Marketing Copy: Transform Your Business Today\n\nAre you ready to take your business to the next level? Our comprehensive solution provides everything you need to succeed in today's competitive market.\n\nWhat makes us different:\n✓ Proven track record with 10,000+ satisfied clients\n✓ Industry-leading features and functionality\n✓ Affordable pricing with no hidden fees\n✓ Expert support when you need it\n\nJoin thousands of businesses that have already made the switch. Start your free trial today and experience the difference for yourself.\n\nNo credit card required. Cancel anytime."
];

generateBtn.addEventListener('click', () => {
    const inputText = generateInput.value.trim();

    if (inputText.length === 0) {
        generateOutput.innerHTML = '<p style="color: var(--accent-text); animation: shake 0.5s ease;">Please enter a prompt to generate content.</p>';
        return;
    }

    // Show loading state with animation
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    generateBtn.style.animation = 'pulse 1s ease-in-out infinite';
    generateOutput.innerHTML = '<p style="color: var(--text-muted);"><span class="loading-dots">AI is generating your content</span></p>';
    
    // Add loading dots animation
    let dots = 0;
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        const loadingText = generateOutput.querySelector('.loading-dots');
        if (loadingText) {
            loadingText.textContent = 'AI is generating your content' + '.'.repeat(dots);
        }
    }, 300);

    // Simulate AI processing
    setTimeout(() => {
        clearInterval(loadingInterval);
        const randomResponse = generateResponses[Math.floor(Math.random() * generateResponses.length)];
        generateOutput.innerHTML = `<p style="white-space: pre-line; color: var(--text-body); animation: fadeInUp 0.5s ease-out;">${randomResponse}</p>`;
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Content';
        generateBtn.style.animation = '';
    }, 1500);
});

// DEMO FUNCTIONALITY - Rewrite Text
const rewriteBtn = document.getElementById('rewriteBtn');
const rewriteInput = document.getElementById('rewriteInput');
const rewriteOutput = document.getElementById('rewriteOutput');

const rewriteExamples = [
    {
        input: "The product is good and works well.",
        output: "This exceptional product delivers outstanding performance and consistently exceeds expectations, making it an excellent investment for your needs."
    },
    {
        input: "We need to talk about the meeting.",
        output: "I'd appreciate the opportunity to discuss the upcoming meeting at your earliest convenience to ensure we're aligned on key objectives and action items."
    },
    {
        input: "The report is done and ready.",
        output: "The comprehensive report has been completed and is now available for your review, incorporating all requested data points and analysis."
    }
];

rewriteBtn.addEventListener('click', () => {
    const inputText = rewriteInput.value.trim();

    if (inputText.length === 0) {
        rewriteOutput.innerHTML = '<p style="color: var(--accent-text); animation: shake 0.5s ease;">Please enter text to rewrite.</p>';
        return;
    }

    // Show loading state with animation
    rewriteBtn.disabled = true;
    rewriteBtn.textContent = 'Rewriting...';
    rewriteBtn.style.animation = 'pulse 1s ease-in-out infinite';
    rewriteOutput.innerHTML = '<p style="color: var(--text-muted);"><span class="loading-dots">AI is improving your text</span></p>';
    
    // Add loading dots animation
    let dots = 0;
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        const loadingText = rewriteOutput.querySelector('.loading-dots');
        if (loadingText) {
            loadingText.textContent = 'AI is improving your text' + '.'.repeat(dots);
        }
    }, 300);

    // Simulate AI processing
    setTimeout(() => {
        clearInterval(loadingInterval);
        const randomExample = rewriteExamples[Math.floor(Math.random() * rewriteExamples.length)];
        rewriteOutput.innerHTML = `<p style="color: var(--text-body); animation: fadeInUp 0.5s ease-out;">${randomExample.output}</p>`;
        rewriteBtn.disabled = false;
        rewriteBtn.textContent = 'Rewrite Text';
        rewriteBtn.style.animation = '';
    }, 1200);
});

// DEMO FUNCTIONALITY - Grammar Check
const grammarBtn = document.getElementById('grammarBtn');
const grammarInput = document.getElementById('grammarInput');
const grammarOutput = document.getElementById('grammarOutput');

const grammarExamples = [
    {
        input: "Their going to they're house to get there things.",
        output: "<strong>Corrected:</strong> They're going to their house to get their things.\n\n<strong>Changes made:</strong>\n• 'Their' → 'They're' (contraction of 'they are')\n• 'they're' → 'their' (possessive pronoun)\n• 'there' → 'their' (possessive pronoun)"
    },
    {
        input: "Me and him went to the store yesterday.",
        output: "<strong>Corrected:</strong> He and I went to the store yesterday.\n\n<strong>Changes made:</strong>\n• 'Me and him' → 'He and I' (correct subject pronoun usage)\n• Subject pronouns 'he' and 'I' should be used instead of object pronouns"
    },
    {
        input: "The report have been completed and its ready for review.",
        output: "<strong>Corrected:</strong> The report has been completed and it's ready for review.\n\n<strong>Changes made:</strong>\n• 'have' → 'has' (singular subject-verb agreement)\n• 'its' → 'it's' (contraction of 'it is')"
    }
];

grammarBtn.addEventListener('click', () => {
    const inputText = grammarInput.value.trim();

    if (inputText.length === 0) {
        grammarOutput.innerHTML = '<p style="color: var(--accent-text); animation: shake 0.5s ease;">Please enter text to check.</p>';
        return;
    }

    // Show loading state with animation
    grammarBtn.disabled = true;
    grammarBtn.textContent = 'Checking...';
    grammarBtn.style.animation = 'pulse 1s ease-in-out infinite';
    grammarOutput.innerHTML = '<p style="color: var(--text-muted);"><span class="loading-dots">AI is analyzing your text</span></p>';
    
    // Add loading dots animation
    let dots = 0;
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        const loadingText = grammarOutput.querySelector('.loading-dots');
        if (loadingText) {
            loadingText.textContent = 'AI is analyzing your text' + '.'.repeat(dots);
        }
    }, 300);

    // Simulate AI processing
    setTimeout(() => {
        clearInterval(loadingInterval);
        const randomExample = grammarExamples[Math.floor(Math.random() * grammarExamples.length)];
        grammarOutput.innerHTML = `<div style="color: var(--text-body); white-space: pre-line; animation: fadeInUp 0.5s ease-out;">${randomExample.output}</div>`;
        grammarBtn.disabled = false;
        grammarBtn.textContent = 'Check Grammar';
        grammarBtn.style.animation = '';
    }, 1300);
});

// CHATBOT FUNCTIONALITY WITH ANIMATIONS
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

const chatbotResponses = {
    default: "Thanks for your question! Scribblr AI offers comprehensive writing assistance including content generation, grammar checking, rewriting, and tone adjustment. We have flexible pricing starting from free up to enterprise plans. Would you like to know more about any specific feature?",
    features: "Scribblr AI includes:\n• AI Content Generation - Create blogs, emails, and marketing copy\n• Smart Rewriting - Improve clarity and style\n• Grammar & Style Checking - Real-time suggestions\n• Tone Adjustment - Switch between professional, casual, or formal\n• 50+ Language Support\n• 100+ Professional Templates\n\nAll features are available in our Pro plan starting at $29/month!",
    pricing: "We offer three plans:\n\n🆓 Free: $0/month - 5,000 words, basic features\n⭐ Pro: $29/month - Unlimited words, all features (Most Popular!)\n🏢 Enterprise: Custom pricing - Team features, API access, dedicated support\n\nAll paid plans include a 14-day free trial with no credit card required!",
    trial: "Yes! We offer a 14-day free trial for our Pro plan with full access to all features. No credit card required to start. You can cancel anytime during the trial period with no charges. Would you like to start your free trial now?",
    comparison: "Scribblr AI stands out with:\n• Best value pricing starting at $0\n• More templates (100+) than competitors\n• Support for 50+ languages\n• Free plan with generous limits\n• API access included in Pro plan\n• Outstanding customer support\n\nCompared to Grammarly, Jasper, and Copy.ai, we offer more features at a better price point!"
};

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <p style="white-space: pre-line; margin: 0;">${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add typing dots animation
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        .typing-dots span {
            width: 8px;
            height: 8px;
            background: var(--accent-primary);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite;
        }
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    return typingDiv;
}

function removeTypingIndicator(indicator) {
    if (indicator) {
        indicator.remove();
    }
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('feature') || lowerMessage.includes('what') && lowerMessage.includes('offer')) {
        return chatbotResponses.features;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return chatbotResponses.pricing;
    } else if (lowerMessage.includes('trial') || lowerMessage.includes('free')) {
        return chatbotResponses.trial;
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('grammarly') || lowerMessage.includes('jasper') || lowerMessage.includes('copy.ai')) {
        return chatbotResponses.comparison;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! Welcome to Scribblr AI. I'm here to help answer any questions about our AI writing assistant. What would you like to know?";
    } else if (lowerMessage.includes('thank')) {
        return "You're welcome! If you have any other questions, feel free to ask. We're here to help!";
    } else {
        return chatbotResponses.default;
    }
}

function sendMessage() {
    const message = chatInput.value.trim();

    if (message.length === 0) {
        chatInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            chatInput.style.animation = '';
        }, 500);
        return;
    }

    // Add user message
    addMessage(message, true);
    chatInput.value = '';

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    // Simulate bot typing delay
    setTimeout(() => {
        removeTypingIndicator(typingIndicator);
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 800);
}

chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

quickQuestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.dataset.question;
        chatInput.value = question;
        sendMessage();
    });
});

// SMOOTH SCROLLING FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// PARALLAX SCROLL EFFECT
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    floatingElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// NUMBER COUNTER ANIMATION
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Observe elements with counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(counter => {
    counterObserver.observe(counter);
});

// NAVBAR SCROLL EFFECT
let lastScroll = 0;
const navbar = document.querySelector('.nav-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// CONSOLE LOG
console.log('%c🎨 Scribblr AI - Enhanced Animations Loaded! ', 'background: linear-gradient(to right, #8FEC78, #81DD67); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c✨ Featuring: Typing effects, ripple buttons, staggered animations, smooth transitions, and more!', 'color: #8FEC78; font-size: 12px;');
