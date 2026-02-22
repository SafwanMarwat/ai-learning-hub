import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import './FAQ.css'

const faqs = [
    {
        question: 'What is AI Earning Hub?',
        answer: 'AI Earning Hub is an educational platform focused on teaching people how to use artificial intelligence tools effectively and explore legitimate online earning opportunities. We provide guides, tutorials, and resources for beginners and professionals alike.'
    },
    {
        question: 'Is the content really free?',
        answer: 'Yes! All our blog posts, guides, and tutorials are completely free to access. We believe education should be accessible to everyone. We may offer premium courses in the future, but our core content will always remain free.'
    },
    {
        question: 'Do I need technical skills to start?',
        answer: 'Not at all! Our content is designed for beginners with no technical background. We explain everything in simple, easy-to-understand language with step-by-step instructions.'
    },
    {
        question: 'How can I start earning online?',
        answer: 'We recommend starting with our "Online Earning Basics" section which covers foundational concepts. From there, you can explore freelancing opportunities or learn how to use AI tools to enhance your skills and earnings potential.'
    },
    {
        question: 'Which AI tools do you recommend for beginners?',
        answer: 'For beginners, we recommend starting with ChatGPT for content and brainstorming, Canva for design, and Grammarly for writing improvement. Check our AI Tools Reviews section for detailed guides on each tool.'
    },
    {
        question: 'How do you monetize this website?',
        answer: 'We use display advertising (Google AdSense) and affiliate marketing. When you click on certain links and make a purchase, we may earn a small commission at no extra cost to you. This helps us keep the content free.'
    },
    {
        question: 'Can I contribute or write for AI Earning Hub?',
        answer: 'We\'re always looking for quality contributors! If you have expertise in AI, freelancing, or online earning, please reach out to us through our contact page with your ideas and writing samples.'
    },
    {
        question: 'How often do you publish new content?',
        answer: 'We aim to publish 2-3 new articles per week. Subscribe to our newsletter to get notified when new content is available.'
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <main className="faq-page">
            <section className="faq-hero">
                <div className="container">
                    <HelpCircle size={48} className="faq-hero__icon" />
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to commonly asked questions about AI Earning Hub</p>
                </div>
            </section>

            <section className="faq-content">
                <div className="container container-narrow">
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openIndex === index ? 'is-open' : ''}`}
                            >
                                <button
                                    className="faq-item__question"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openIndex === index}
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown size={20} />
                                </button>
                                <div className="faq-item__answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
