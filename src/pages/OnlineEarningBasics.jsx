import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import AdSlot from '../components/AdSlot'
import { BookOpen, ArrowRight, DollarSign, Globe, CreditCard, Shield } from 'lucide-react'
import './CategoryPage.css'

export default function OnlineEarningBasics() {
    const { getPostsByCategory } = useBlog()
    const posts = getPostsByCategory('online-basics')

    const topics = [
        { icon: DollarSign, title: 'Earning Methods', desc: 'Different ways to make money online' },
        { icon: Globe, title: 'Getting Started', desc: 'First steps for complete beginners' },
        { icon: CreditCard, title: 'Payment Methods', desc: 'How to receive international payments' },
        { icon: Shield, title: 'Avoiding Scams', desc: 'Stay safe from online fraud' },
    ]

    return (
        <main className="category-page">
            <section className="category-hero category-hero--success">
                <div className="container">
                    <BookOpen size={48} className="category-hero__icon" />
                    <h1>Online Earning Basics</h1>
                    <p>Everything beginners need to know about earning money online safely and effectively.</p>
                </div>
            </section>

            <section className="category-featured">
                <div className="container">
                    <h2>Essential Topics</h2>
                    <div className="guides-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        {topics.map((topic, i) => (
                            <div key={i} className="guide-card" style={{ cursor: 'default' }}>
                                <div className="guide-card__icon guide-card__icon--beginner">
                                    <topic.icon size={24} />
                                </div>
                                <h3>{topic.title}</h3>
                                <p>{topic.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AdSlot type="horizontal" />

            <section className="category-posts">
                <div className="container">
                    <h2>Beginner-Friendly Articles</h2>
                    {posts.length > 0 ? (
                        <div className="category-posts__grid">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="category-empty">
                            <p>No articles yet. Check back soon!</p>
                            <Link to="/blog" className="btn btn-primary">Browse All Articles <ArrowRight size={16} /></Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
