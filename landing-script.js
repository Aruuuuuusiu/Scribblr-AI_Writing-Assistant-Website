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

// Demo Tabs
const demoTabs = document.querySelectorAll('.demo-tab');
const demoContents = document.querySelectorAll('.demo-content');

demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Remove active class from all tabs and contents
        demoTabs.forEach(t => t.classList.remove('active'));
        demoContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(`${targetTab}-demo`).classList.add('active');
    });
});

// Demo Functionality - Generate Content
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
        generateOutput.innerHTML = '<p style="color: var(--accent-text);">Please enter a prompt to generate content.</p>';
        return;
    }
    
    // Show loading state
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    generateOutput.innerHTML = '<p style="color: var(--text-muted);">AI is generating your content...</p>';
    
    // Simulate AI processing
    setTimeout(() => {
        const randomResponse = generateResponses[Math.floor(Math.random() * generateResponses.length)];
        generateOutput.innerHTML = `<p style="white-space: pre-line; color: var(--text-body);">${randomResponse}</p>`;
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Content';
    }, 1500);
});

// Demo Functionality - Rewrite Text
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
        rewriteOutput.innerHTML = '<p style="color: var(--accent-text);">Please enter text to rewrite.</p>';
        return;
    }
    
    // Show loading state
    rewriteBtn.disabled = true;
    rewriteBtn.textContent = 'Rewriting...';
    rewriteOutput.innerHTML = '<p style="color: var(--text-muted);">AI is improving your text...</p>';
    
    // Simulate AI processing
    setTimeout(() => {
        const randomExample = rewriteExamples[Math.floor(Math.random() * rewriteExamples.length)];
        rewriteOutput.innerHTML = `<p style="color: var(--text-body);">${randomExample.output}</p>`;
        rewriteBtn.disabled = false;
        rewriteBtn.textContent = 'Rewrite Text';
    }, 1200);
});

// Demo Functionality - Grammar Check
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
        grammarOutput.innerHTML = '<p style="color: var(--accent-text);">Please enter text to check.</p>';
        return;
    }
    
    // Show loading state
    grammarBtn.disabled = true;
    grammarBtn.textContent = 'Checking...';
    grammarOutput.innerHTML = '<p style="color: var(--text-muted);">AI is analyzing your text...</p>';
    
    // Simulate AI processing
    setTimeout(() => {
        const randomExample = grammarExamples[Math.floor(Math.random() * grammarExamples.length)];
        grammarOutput.innerHTML = `<div style="color: var(--text-body); white-space: pre-line;">${randomExample.output}</div>`;
        grammarBtn.disabled = false;
        grammarBtn.textContent = 'Check Grammar';
    }, 1300);
});

// Chatbot Functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

const chatbotResponses = {
    default: "Thanks for your question! WriteMaster AI offers comprehensive writing assistance including content generation, grammar checking, rewriting, and tone adjustment. We have flexible pricing starting from free up to enterprise plans. Would you like to know more about any specific feature?",
    features: "WriteMaster AI includes:\n• AI Content Generation - Create blogs, emails, and marketing copy\n• Smart Rewriting - Improve clarity and style\n• Grammar & Style Checking - Real-time suggestions\n• Tone Adjustment - Switch between professional, casual, or formal\n• 50+ Language Support\n• 100+ Professional Templates\n\nAll features are available in our Pro plan starting at $29/month!",
    pricing: "We offer three plans:\n\n🆓 Free: $0/month - 5,000 words, basic features\n⭐ Pro: $29/month - Unlimited words, all features (Most Popular!)\n🏢 Enterprise: Custom pricing - Team features, API access, dedicated support\n\nAll paid plans include a 14-day free trial with no credit card required!",
    trial: "Yes! We offer a 14-day free trial for our Pro plan with full access to all features. No credit card required to start. You can cancel anytime during the trial period with no charges. Would you like to start your free trial now?",
    comparison: "WriteMaster AI stands out with:\n• Best value pricing starting at $0\n• More templates (100+) than competitors\n• Support for 50+ languages\n• Free plan with generous limits\n• API access included in Pro plan\n• Outstanding customer support\n\nCompared to Grammarly, Jasper, and Copy.ai, we offer more features at a better price point!"
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
        return "Hello! Welcome to WriteMaster AI. I'm here to help answer any questions about our AI writing assistant. What would you like to know?";
    } else if (lowerMessage.includes('thank')) {
        return "You're welcome! If you have any other questions, feel free to ask. We're here to help!";
    } else {
        return chatbotResponses.default;
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message.length === 0) {
        return;
    }
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Show typing indicator
    setTimeout(() => {
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

// Smooth scrolling for anchor links
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

// Add scroll-based animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

console.log('WriteMaster AI Landing Page Loaded Successfully!');