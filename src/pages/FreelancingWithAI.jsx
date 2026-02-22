import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import AdSlot from '../components/AdSlot'
import { Briefcase, ArrowRight, PenTool, Code, Palette, MessageSquare } from 'lucide-react'
import './CategoryPage.css'

export default function FreelancingWithAI() {
    const { getPostsByCategory } = useBlog()
    const posts = getPostsByCategory('freelancing')

    const services = [
        { icon: PenTool, title: 'Content Writing', desc: 'Use AI to write faster and better' },
        { icon: Code, title: 'Web Development', desc: 'Speed up coding with AI assistants' },
        { icon: Palette, title: 'Graphic Design', desc: 'Create stunning designs with AI tools' },
        { icon: MessageSquare, title: 'Virtual Assistance', desc: 'Automate tasks with AI' },
    ]

    return (
        <main className="category-page">
            <section className="category-hero category-hero--secondary">
                <div className="container">
                    <Briefcase size={48} className="category-hero__icon" />
                    <h1>Freelancing with AI</h1>
                    <p>Learn how to supercharge your freelance career using AI tools to work smarter, not harder.</p>
                </div>
            </section>

            <section className="category-featured">
                <div className="container">
                    <h2>Freelance Services You Can Offer</h2>
                    <div className="guides-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        {services.map((service, i) => (
                            <div key={i} className="guide-card" style={{ cursor: 'default' }}>
                                <div className="guide-card__icon guide-card__icon--beginner">
                                    <service.icon size={24} />
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AdSlot type="horizontal" />

            <section className="category-posts">
                <div className="container">
                    <h2>Freelancing Articles</h2>
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
