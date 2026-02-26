import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Clock, Eye, ArrowLeft, Share2, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import { useState, useEffect } from 'react'
import AdSlot from '../components/AdSlot'
import BlogCard from '../components/BlogCard'
import './BlogPost.css'

export default function BlogPost() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { getPost, getPublishedPosts, addComment, incrementViews } = useBlog()
    const post = getPost(slug)

    const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [commentSuccess, setCommentSuccess] = useState(false)

    // Fire incrementViews once when the post loads
    useEffect(() => {
        if (post?.id) {
            incrementViews(post.id)
        }
    }, [post?.id])

    if (!post) {
        return (
            <main className="blog-post-page">
                <div className="container">
                    <div className="blog-post__not-found">
                        <h1>Post Not Found</h1>
                        <p>The article you're looking for doesn't exist or has been removed.</p>
                        <Link to="/blog" className="btn btn-primary">
                            <ArrowLeft size={18} /> Back to Blog
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    const relatedPosts = getPublishedPosts()
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const handleShare = (platform) => {
        const url = window.location.href
        const text = post.title
        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        }
        window.open(urls[platform], '_blank', 'width=600,height=400')
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise(resolve => setTimeout(resolve, 500))

        addComment(post.id, {
            name: commentForm.name,
            content: commentForm.content
        })

        setCommentForm({ name: '', email: '', content: '' })
        setIsSubmitting(false)
        setCommentSuccess(true)
        setTimeout(() => setCommentSuccess(false), 3000)
    }

    return (
        <main className="blog-post-page">
            {/* Header */}
            <header className="blog-post__header">
                <div className="container">
                    <Link to="/blog" className="blog-post__back">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>
                    <div className="blog-post__meta">
                        <span className="badge badge-primary">{post.category.replace('-', ' ')}</span>
                        <span className="blog-post__date">
                            <Calendar size={16} /> {formatDate(post.createdAt)}
                        </span>
                        <span className="blog-post__views">
                            <Eye size={16} /> {post.views?.toLocaleString() || 0} views
                        </span>
                    </div>
                    <h1 className="blog-post__title">{post.title}</h1>
                    <p className="blog-post__excerpt">{post.excerpt}</p>
                    <div className="blog-post__author">
                        <div className="blog-post__author-avatar">
                            {post.author?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <span className="blog-post__author-name">{post.author || 'AI Earning Hub'}</span>
                            <span className="blog-post__author-role">Content Team</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="blog-post__image-wrapper">
                <div className="container">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="blog-post__image"
                    />
                </div>
            </div>

            {/* Content */}
            <article className="blog-post__content">
                <div className="container">
                    <div className="blog-post__layout">
                        <div className="blog-post__main">
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="blog-post__tags">
                                    <span>Tags:</span>
                                    {post.tags.map((tag) => (
                                        <Link key={tag} to={`/blog?search=${tag}`} className="blog-post__tag">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Share */}
                            <div className="blog-post__share">
                                <span>Share this article:</span>
                                <div className="blog-post__share-buttons">
                                    <button onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                                        <Twitter size={20} />
                                    </button>
                                    <button onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn">
                                        <Linkedin size={20} />
                                    </button>
                                    <button onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
                                        <Facebook size={20} />
                                    </button>
                                </div>
                            </div>

                            <AdSlot type="horizontal" />

                            {/* Comments */}
                            <section className="blog-post__comments" id="comments">
                                <h2>
                                    <MessageCircle size={24} /> Comments ({post.comments?.length || 0})
                                </h2>

                                {/* Comment Form */}
                                <form className="comment-form" onSubmit={handleCommentSubmit}>
                                    <h3>Leave a Comment</h3>
                                    {commentSuccess && (
                                        <div className="comment-form__success">
                                            Your comment has been posted!
                                        </div>
                                    )}
                                    <div className="comment-form__row">
                                        <div className="comment-form__field">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="input"
                                                value={commentForm.name}
                                                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="comment-form__field">
                                            <label htmlFor="email">Email (not published)</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="input"
                                                value={commentForm.email}
                                                onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="comment-form__field">
                                        <label htmlFor="comment">Comment</label>
                                        <textarea
                                            id="comment"
                                            className="input textarea"
                                            rows="4"
                                            value={commentForm.content}
                                            onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                                    </button>
                                </form>

                                {/* Comments List */}
                                {post.comments && post.comments.length > 0 && (
                                    <div className="comments-list">
                                        {post.comments.map((comment) => (
                                            <div key={comment.id} className="comment">
                                                <div className="comment__avatar">
                                                    {comment.name.charAt(0)}
                                                </div>
                                                <div className="comment__content">
                                                    <div className="comment__header">
                                                        <span className="comment__name">{comment.name}</span>
                                                        <span className="comment__date">{formatDate(comment.createdAt)}</span>
                                                    </div>
                                                    <p className="comment__text">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="blog-post__sidebar">
                            <AdSlot type="vertical" />
                        </aside>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="blog-post__related">
                    <div className="container">
                        <h2>Related Articles</h2>
                        <div className="blog-post__related-grid">
                            {relatedPosts.map((relPost) => (
                                <BlogCard key={relPost.id} post={relPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}