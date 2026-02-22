import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import AdSlot from '../components/AdSlot'
import { Sparkles, Star, ArrowRight } from 'lucide-react'
import './CategoryPage.css'

export default function AIToolsReviews() {
    const { getPostsByCategory } = useBlog()
    const posts = getPostsByCategory('ai-tools')

    const featuredTools = [
        { name: 'ChatGPT', rating: 5, desc: 'AI conversation and content generation' },
        { name: 'Midjourney', rating: 5, desc: 'AI image generation' },
        { name: 'Jasper AI', rating: 4, desc: 'Marketing copywriting' },
        { name: 'Grammarly', rating: 5, desc: 'Writing assistant' },
    ]

    return (
        <main className="category-page">
            <section className="category-hero category-hero--primary">
                <div className="container">
                    <Sparkles size={48} className="category-hero__icon" />
                    <h1>AI Tools Reviews</h1>
                    <p>Honest, in-depth reviews of the best AI tools to boost your productivity and earning potential.</p>
                </div>
            </section>

            <section className="category-featured">
                <div className="container">
                    <h2>Top Rated Tools</h2>
                    <div className="tools-grid">
                        {featuredTools.map((tool, i) => (
                            <div key={i} className="tool-card">
                                <h3>{tool.name}</h3>
                                <div className="tool-card__rating">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={16} fill={j < tool.rating ? 'currentColor' : 'none'} />
                                    ))}
                                </div>
                                <p>{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AdSlot type="horizontal" />

            <section className="category-posts">
                <div className="container">
                    <h2>Latest AI Tools Articles</h2>
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
