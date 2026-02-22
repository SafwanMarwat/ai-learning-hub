import { Link } from 'react-router-dom'
import { Package, ExternalLink, ArrowRight } from 'lucide-react'
import './Resources.css'

const resources = [
    {
        category: 'AI Tools',
        items: [
            { name: 'ChatGPT', url: 'https://chat.openai.com', desc: 'AI conversation and content' },
            { name: 'Claude', url: 'https://claude.ai', desc: 'Advanced AI assistant' },
            { name: 'Midjourney', url: 'https://midjourney.com', desc: 'AI image generation' },
            { name: 'Canva', url: 'https://canva.com', desc: 'Design with AI features' },
        ]
    },
    {
        category: 'Freelancing Platforms',
        items: [
            { name: 'Upwork', url: 'https://upwork.com', desc: 'Global freelance marketplace' },
            { name: 'Fiverr', url: 'https://fiverr.com', desc: 'Service-based gigs' },
            { name: 'Freelancer', url: 'https://freelancer.com', desc: 'Project-based work' },
            { name: 'Toptal', url: 'https://toptal.com', desc: 'Top 3% of freelancers' },
        ]
    },
    {
        category: 'Learning Platforms',
        items: [
            { name: 'Coursera', url: 'https://coursera.org', desc: 'University courses online' },
            { name: 'Udemy', url: 'https://udemy.com', desc: 'Affordable skill courses' },
            { name: 'YouTube', url: 'https://youtube.com', desc: 'Free video tutorials' },
            { name: 'freeCodeCamp', url: 'https://freecodecamp.org', desc: 'Free coding education' },
        ]
    },
    {
        category: 'Payment Solutions',
        items: [
            { name: 'Payoneer', url: 'https://payoneer.com', desc: 'International payments' },
            { name: 'Wise', url: 'https://wise.com', desc: 'Low-fee transfers' },
            { name: 'PayPal', url: 'https://paypal.com', desc: 'Widely accepted' },
        ]
    }
]

export default function Resources() {
    return (
        <main className="resources-page">
            <section className="resources-hero">
                <div className="container">
                    <Package size={48} className="resources-hero__icon" />
                    <h1>Resources</h1>
                    <p>Curated tools, platforms, and resources to help you succeed in your AI and online earning journey.</p>
                </div>
            </section>

            <section className="resources-content">
                <div className="container">
                    {resources.map((section, i) => (
                        <div key={i} className="resources-section">
                            <h2>{section.category}</h2>
                            <div className="resources-grid">
                                {section.items.map((item, j) => (
                                    <a
                                        key={j}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-card"
                                    >
                                        <div className="resource-card__content">
                                            <h3>{item.name} <ExternalLink size={14} /></h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
