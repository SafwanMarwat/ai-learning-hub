import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import AdSlot from '../components/AdSlot'
import { TrendingUp, ArrowRight, Zap, Target, Award } from 'lucide-react'
import './CategoryPage.css'

export default function AIEarningGuides() {
    const { getPostsByCategory } = useBlog()
    const posts = getPostsByCategory('earning-guides')

    const guides = [
        { icon: Zap, level: 'beginner', title: 'Quick Start Guide', desc: 'Start earning with AI in under a week' },
        { icon: Target, level: 'intermediate', title: 'Scaling Your Income', desc: 'Take your earnings to the next level' },
        { icon: Award, level: 'advanced', title: 'Building a Business', desc: 'Create sustainable AI-powered income' },
    ]

    return (
        <main className="category-page">
            <section className="category-hero category-hero--accent">
                <div className="container">
                    <TrendingUp size={48} className="category-hero__icon" />
                    <h1>AI Earning Guides</h1>
                    <p>Step-by-step guides to help you monetize AI tools and build sustainable online income streams.</p>
                </div>
            </section>

            <section className="category-featured">
                <div className="container">
                    <h2>Learning Paths</h2>
                    <div className="guides-grid">
                        {guides.map((guide, i) => (
                            <Link key={i} to="/blog" className="guide-card">
                                <div className={`guide-card__icon guide-card__icon--${guide.level}`}>
                                    <guide.icon size={24} />
                                </div>
                                <h3>{guide.title}</h3>
                                <p>{guide.desc}</p>
                                <span>Explore <ArrowRight size={14} /></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <AdSlot type="horizontal" />

            <section className="category-posts">
                <div className="container">
                    <h2>Latest Earning Guides</h2>
                    {posts.length > 0 ? (
                        <div className="category-posts__grid">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="category-empty">
                            <p>No articles yet. Check back soon!</p>
                            <Link to="/blog" className="btn btn-primary">
                                Browse All Articles <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
