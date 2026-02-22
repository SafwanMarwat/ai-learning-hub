export const placeholderPosts = [
    // --- AI Tools ---
    {
        id: 'placeholder-ai-1',
        title: 'Top 10 AI Tools That Pay for Themselves in 2024',
        slug: 'top-10-ai-tools-roi',
        excerpt: 'We tested 50+ AI tools. These 10 offer the best return on investment for digital creators.',
        content: `
            <p>Not all AI tools are created equal. Some are toys, while others are serious business assets. Here is our curated list of tools that actually drive revenue.</p>
            <h3>1. Midjourney</h3>
            <p>For designers, Midjourney is indispensable. It can generate assets, mockups, and inspiration in seconds.</p>
            <h3>2. Jasper</h3>
            <p>For writers, Jasper offers distinct advantages over raw ChatGPT, including brand voice memory and SEO integration.</p>
            <h3>3. Descript</h3>
            <p>Video editors can edit video by editing text. It deletes filler words automatically and saves hours of scrubbing time.</p>
        `,
        category: 'ai-tools',
        tags: ['Reviews', 'Software', 'ROI'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        views: 940,
        readTime: '6 min',
        featured: true
    },
    {
        id: 'placeholder-ai-2',
        title: 'Is GitHub Copilot Worth the $10/Month?',
        slug: 'github-copilot-review',
        excerpt: 'A comprehensive review for freelance developers. Does it actually speed up coding enough to justify the cost?',
        content: '<p>For developers, time is money. GitHub Copilot promises to be your AI pair programmer...</p>',
        category: 'ai-tools',
        tags: ['Coding', 'DevTools', 'Review'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 172800000 * 2).toISOString(),
        views: 450,
        readTime: '5 min'
    },
    {
        id: 'placeholder-ai-3',
        title: 'ElevenLabs vs. Murf: Validating AI Voiceovers',
        slug: 'elevenlabs-vs-murf-review',
        excerpt: 'Which AI voice generator sounds more human? We compared them head-to-head for YouTube narration.',
        content: '<p>Voiceovers used to cost hundreds of dollars. Now, AI can generate them for pennies...</p>',
        category: 'ai-tools',
        tags: ['Audio', 'YouTube', 'Comparison'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 172800000 * 5).toISOString(),
        views: 890,
        readTime: '7 min'
    },

    // --- Freelancing ---
    {
        id: 'placeholder-free-1',
        title: 'The Complete ChatGPT Playbook for Freelancers',
        slug: 'chatgpt-playbook-freelancers',
        excerpt: 'Learn exactly how top freelancers use ChatGPT to land clients, deliver faster, and charge more.',
        content: `
            <p>Artificial Intelligence isn't coming for your job—it's coming to upgrade it. For freelancers, tools like ChatGPT aren't just novelties; they are productivity engines that can double your output.</p>
            <h3>1. The Proposal Generator</h3>
            <p>One of the most tedious parts of freelancing is writing proposals. Use this prompt to generate winning pitches:</p>
            <pre><code>"Act as a senior copywriter. Write a persuasive Upwork proposal for a client needing a React developer. Focus on speed, quality, and communication."</code></pre>
            <p>By automating the rough draft, you can spend more time personalizing the details that actually win the client.</p>
        `,
        category: 'freelancing',
        tags: ['ChatGPT', 'Freelancing', 'Productivity'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date().toISOString(), // Today
        views: 1250,
        readTime: '8 min',
        featured: true
    },
    {
        id: 'placeholder-free-2',
        title: 'How to Position Yourself as an "AI Consultant" on Upwork',
        slug: 'ai-consultant-upwork-guide',
        excerpt: 'Stop being a "writer" and start being an "AI-enhanced content strategist". Here is how to rebrand.',
        content: '<p>The heavy lifting is done by AI, but the strategy is done by you. Clients pay for results, not just hours...</p>',
        category: 'freelancing',
        tags: ['Upwork', 'Career', 'Strategy'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        views: 2100,
        readTime: '10 min'
    },
    {
        id: 'placeholder-free-3',
        title: '5 AI Services You Can Sell on Fiverr Today',
        slug: 'ai-services-fiverr',
        excerpt: 'From restoring old photos to generating coloring book pages, here are low-competition gigs you can start now.',
        content: '<p>Fiverr is competitive, but new AI niches are opening up every day...</p>',
        category: 'freelancing',
        tags: ['Fiverr', 'Side Hustle', 'Ideas'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        views: 3300,
        readTime: '6 min'
    },

    // --- Earning Guides ---
    {
        id: 'placeholder-earn-1',
        title: 'How to Build a Passive Income Stream with AI Art',
        slug: 'passive-income-ai-art',
        excerpt: 'A step-by-step guide to selling AI-generated prints, stickers, and digital assets on Etsy.',
        content: `
            <p>The barrier to entry for digital art has crashed down. Now, creativity—not technical skill—is the differentiator.</p>
            <h3>Step 1: Niche Selection</h3>
            <p>Don't just "make art." Pick a specific niche like "vintage botanical posters" or "cyberpunk stickers."</p>
            <h3>Step 2: Upscaling</h3>
            <p>Midjourney images are too small for print. Use tools like Topaz Gigapixel or free AI upscalers to reach 300 DPI.</p>
        `,
        category: 'earning-guides',
        tags: ['Passive Income', 'Midjourney', 'Etsy'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        views: 3200,
        readTime: '12 min'
    },
    {
        id: 'placeholder-earn-2',
        title: 'Creating and Selling AI Children\'s Books on Amazon KDP',
        slug: 'ai-childrens-books-kdp',
        excerpt: 'Use ChatGPT for the story and Midjourney for the illustrations. A complete publishing workflow.',
        content: '<p>Self-publishing has never been easier. But quality still matters...</p>',
        category: 'earning-guides',
        tags: ['KDP', 'Publishing', 'Books'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 172800000 * 3).toISOString(),
        views: 1500,
        readTime: '15 min'
    },
    {
        id: 'placeholder-earn-3',
        title: 'The Faceless YouTube Channel Strategy (Automated)',
        slug: 'faceless-youtube-automation',
        excerpt: 'How to build a YouTube channel without showing your face, using AI for scripts, voice, and visuals.',
        content: '<p>YouTube Automation is a buzzword, but the core principle is sound: treat content like a business...</p>',
        category: 'earning-guides',
        tags: ['YouTube', 'Automation', 'Video'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 172800000 * 6).toISOString(),
        views: 5600,
        readTime: '9 min'
    },

    // --- Online Basics ---
    {
        id: 'placeholder-basic-1',
        title: 'Getting Started with Online Earning: A Complete Beginner Guide',
        slug: 'getting-started-online-earning',
        excerpt: 'Avoid scams and find legitimate ways to make money online. From freelancing to digital products.',
        content: `
            <p>The internet is full of "get rich quick" schemes. Ignore them. Real online earning takes work, skill, and patience.</p>
            <h3>1. Freelancing</h3>
            <p>Trading time for money is the fastest way to start. Platforms like Upwork and Fiverr are competitive but valid starting points.</p>
        `,
        category: 'online-basics',
        tags: ['Beginners', 'Money', 'Remote Work'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        views: 4100,
        readTime: '10 min'
    },
    {
        id: 'placeholder-basic-2',
        title: 'Understanding Crypto & AI Projects: What\'s Real?',
        slug: 'crypto-ai-basics',
        excerpt: 'A beginner\'s look at the intersection of blockchain and AI. How to spot hype vs utility.',
        content: '<p>Web3 and AI are colliding. But 99% of projects are noise...</p>',
        category: 'online-basics',
        tags: ['Crypto', 'Web3', 'Education'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 259200000 * 2).toISOString(),
        views: 800,
        readTime: '7 min'
    },
    {
        id: 'placeholder-basic-3',
        title: 'Remote Work vs. Freelancing: Which is Right for You?',
        slug: 'remote-work-vs-freelancing',
        excerpt: 'Should you find a remote job or start a freelance business? We break down the pros and cons.',
        content: '<p>Stability vs Freedom. It is the age-old question for digital workers...</p>',
        category: 'online-basics',
        tags: ['Career', 'Remote Work', 'Lifestyle'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 259200000 * 4).toISOString(),
        views: 1200,
        readTime: '6 min'
    },

    // --- Resources ---
    {
        id: 'placeholder-res-1',
        title: 'The Ultimate AI Prompt Library (PDF Download)',
        slug: 'ultimate-prompt-library',
        excerpt: 'Over 1000 prompts for writing, coding, design, and marketing. Free resource.',
        content: '<p>Prompts are the source code of the new economy...</p>',
        category: 'resources',
        tags: ['Prompts', 'Download', 'Free'],
        author: 'AI Earning Hub',
        featuredImage: '',
        status: 'published',
        createdAt: new Date(Date.now() - 500000000).toISOString(),
        views: 8900,
        readTime: '3 min'
    }
]
