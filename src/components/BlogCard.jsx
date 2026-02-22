import { Link } from 'react-router-dom'
import './BlogCard.css'

const gradientIcons = ['AI', '$', 'Art', '+', 'Aa', '01', 'Pro', '◆']
const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6']

export default function BlogCard({ post, gradientIndex = 0 }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    const getCategoryLabel = (category) => {
        const labels = {
            'ai-tools': 'AI Tools',
            'freelancing': 'Freelancing',
            'earning-guides': 'Income',
            'online-basics': 'Beginner',
            'resources': 'Resources'
        }
        return labels[category] || category?.replace('-', ' ') || 'Article'
    }

    const gradient = gradients[gradientIndex % gradients.length]
    const icon = gradientIcons[gradientIndex % gradientIcons.length]

    return (
        <article className="article-card">
            <Link to={`/blog/${post.slug}`} className="article-card__link">
                <div className="article-image">
                    {post.featuredImage ? (
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="article-image__img"
                            loading="lazy"
                        />
                    ) : (
                        <div className={`article-image-bg ${gradient}`}>
                            {icon}
                        </div>
                    )}
                    <span className="article-tag">
                        {getCategoryLabel(post.category)}
                    </span>
                </div>

                <div className="article-content">
                    <h3>{post.title}</h3>
                    <p className="article-excerpt line-clamp-2">
                        {post.excerpt || 'Read this article to learn more...'}
                    </p>
                    <div className="article-meta">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>{post.readTime || '5 min'}</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}
