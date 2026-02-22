import { Link } from 'react-router-dom'
import { Target, Heart, Users, Award, ArrowRight } from 'lucide-react'
import './About.css'

const values = [
    { icon: Target, title: 'Mission-Driven', desc: 'We believe everyone deserves access to quality education about AI and online earning.' },
    { icon: Heart, title: 'Ethical First', desc: 'We only promote legal, ethical, and sustainable methods of earning online.' },
    { icon: Users, title: 'Community Focused', desc: 'Building a supportive community of learners and earners helping each other grow.' },
    { icon: Award, title: 'Quality Content', desc: 'Every piece of content is thoroughly researched and practically tested.' },
]

export default function About() {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="container">
                    <span className="about-hero__badge">About Us</span>
                    <h1>Empowering You to <span className="text-gradient">Learn & Earn</span> with AI</h1>
                    <p>
                        AI Earning Hub is an educational platform dedicated to helping students, freelancers,
                        and professionals understand and leverage artificial intelligence for career growth and online earning.
                    </p>
                </div>
            </section>

            <section className="about-story">
                <div className="container">
                    <div className="about-story__grid">
                        <div className="about-story__content">
                            <h2>Our Story</h2>
                            <p>
                                AI Earning Hub was born from a simple observation: while AI tools are transforming
                                how we work and earn, many people—especially in developing regions—lack access to
                                quality, practical education about these opportunities.
                            </p>
                            <p>
                                We started with a mission to bridge this gap by creating easy-to-understand guides,
                                honest AI tool reviews, and actionable freelancing insights. Our goal is to help
                                anyone, regardless of their background, build valuable skills and create sustainable
                                income streams.
                            </p>
                            <p>
                                Today, we're proud to serve a growing community of learners from around the world,
                                with a special focus on helping beginners take their first steps into the digital economy.
                            </p>
                        </div>
                        <div className="about-story__image">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
                                alt="Team collaboration"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <h2>Our Values</h2>
                    <div className="about-values__grid">
                        {values.map((value, i) => (
                            <div key={i} className="value-card">
                                <div className="value-card__icon">
                                    <value.icon size={28} />
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="container">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Explore our resources and take the first step towards mastering AI and online earning.</p>
                    <div className="about-cta__actions">
                        <Link to="/blog" className="btn btn-primary btn-lg">
                            Read Our Blog <ArrowRight size={18} />
                        </Link>
                        <Link to="/contact" className="btn btn-secondary btn-lg">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
