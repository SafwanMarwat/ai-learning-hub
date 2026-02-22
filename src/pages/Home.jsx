import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import AdSlot from '../components/AdSlot'
import './Home.css'

export default function Home() {
    const { getPublishedPosts, getFeaturedPosts, categories } = useBlog()
    const featuredPosts = getFeaturedPosts()
    const recentPosts = getPublishedPosts().slice(0, 6)

    // Newsletter state
    const [email, setEmail] = useState('')
    const [isSubscribing, setIsSubscribing] = useState(false)
    const [subscribeSuccess, setSubscribeSuccess] = useState(false)
    const [subscribeError, setSubscribeError] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setIsSubscribing(true)
        setSubscribeError('')

        try {
            await addDoc(collection(db, 'subscribers'), {
                email,
                createdAt: serverTimestamp(),
                source: 'homepage'
            })
            setSubscribeSuccess(true)
            setEmail('')
        } catch (err) {
            console.error('Subscribe error:', err)
            setSubscribeError('Failed to subscribe. Please try again.')
        }

        setIsSubscribing(false)
    }

    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__bg" />
                <div className="hero__inner container">
                    <div className="hero__content">
                        <div className="hero__label animate-fade-in">
                            <span className="hero__label-dot" />
                            New articles weekly
                        </div>
                        <h1 className="hero__title animate-fade-in-up">
                            Practical guides to <em>earning</em> with AI
                        </h1>
                        <p className="hero__desc animate-fade-in-up stagger-1">
                            No fluff, no hype. Just real strategies for using AI tools to build
                            income through freelancing, content creation, and smart automation.
                        </p>
                        <div className="hero__cta animate-fade-in-up stagger-2">
                            <Link to="/blog" className="btn btn-primary btn-lg">
                                Read articles
                            </Link>
                            <Link to="/contact" className="btn btn-ghost btn-lg">
                                Get updates
                            </Link>
                        </div>
                    </div>

                    <div className="hero__visual">
                        <div className="hero__card">
                            <div className="hero__card-label">Latest Guide</div>
                            <h3>The Complete ChatGPT Playbook for Freelancers</h3>
                            <p>Learn exactly how top freelancers use ChatGPT to land clients, deliver faster, and charge more.</p>
                            <div className="hero__card-meta">
                                <span>15 min read</span>
                                <span>•</span>
                                <span>Jan 2024</span>
                            </div>
                        </div>
                        <div className="hero__float hero__float--1 animate-float">
                            <strong>50+</strong>
                            <span>Tools reviewed</span>
                        </div>
                        <div className="hero__float hero__float--2 animate-float stagger-2">
                            <strong>10K</strong>
                            <span>Monthly readers</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics Bar */}
            <div className="topics-bar">
                <div className="topics__inner container">
                    <div className="topics__list">
                        <Link to="/blog" className="topic-btn active">All</Link>
                        <Link to="/ai-tools" className="topic-btn">AI Tools</Link>
                        <Link to="/freelancing" className="topic-btn">Freelancing</Link>
                        <Link to="/ai-earning-guides" className="topic-btn">Passive Income</Link>
                        <Link to="/online-earning" className="topic-btn">Tutorials</Link>
                    </div>
                    <Link to="/blog?search=true" className="topics__search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <span>Search articles...</span>
                    </Link>
                </div>
            </div>

            {/* Featured Article */}
            {featuredPosts.length > 0 && (
                <section className="articles-section container">
                    <div className="section__header">
                        <h2>Latest articles</h2>
                        <Link to="/blog" className="section__link">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    <article className="featured-article">
                        <div className="featured-image">
                            <div className="featured-image-bg gradient-1">GPT</div>
                        </div>
                        <div className="featured-content">
                            <span className="badge badge-primary">Featured</span>
                            <h2>
                                <Link to={`/blog/${featuredPosts[0]?.slug || 'chatgpt-guide'}`}>
                                    {featuredPosts[0]?.title || 'The Complete ChatGPT Guide: Everything You Need to Know'}
                                </Link>
                            </h2>
                            <p className="featured-excerpt">
                                {featuredPosts[0]?.excerpt || 'Master ChatGPT with this comprehensive guide covering prompts, workflows, and real-world applications for content creators and freelancers.'}
                            </p>
                            <div className="featured-meta">
                                <span>{featuredPosts[0]?.date || 'Jan 25, 2024'}</span>
                                <span>{featuredPosts[0]?.readTime || '15 min read'}</span>
                            </div>
                        </div>
                    </article>

                    {/* Articles Grid */}
                    <div className="articles-grid">
                        {recentPosts.slice(0, 6).map((post, index) => (
                            <BlogCard key={post.id} post={post} gradientIndex={index} />
                        ))}
                    </div>
                </section>
            )}

            {/* Ad Space */}
            <AdSlot type="horizontal" />

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section__header">
                        <h2>Browse by topic</h2>
                    </div>
                    <div className="categories-grid">
                        {categories.map((category, i) => {
                            const categoryPaths = {
                                'ai-tools': '/ai-tools',
                                'freelancing': '/freelancing',
                                'earning-guides': '/ai-earning-guides',
                                'online-basics': '/online-earning',
                                'resources': '/resources'
                            }
                            return (
                                <Link
                                    key={category.id}
                                    to={categoryPaths[category.id] || `/blog?category=${category.id}`}
                                    className={`category-card gradient-${(i % 6) + 1}`}
                                >
                                    <h3>{category.name}</h3>
                                    <span>Explore articles →</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="newsletter">
                <div className="newsletter__inner">
                    <h2>Get smarter about AI</h2>
                    <p>Weekly insights on AI tools, earning strategies, and practical guides. Join 5,000+ readers.</p>

                    {subscribeSuccess ? (
                        <div className="newsletter__success">
                            ✓ You're subscribed! Check your inbox for confirmation.
                        </div>
                    ) : (
                        <form className="newsletter__form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                className="newsletter__input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-accent" disabled={isSubscribing}>
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    )}
                    {subscribeError && <p className="newsletter__error">{subscribeError}</p>}
                </div>
            </section>
        </main>
    )
}
