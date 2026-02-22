import { Link } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useBlog } from '../../context/BlogContext'
import { FileText, PlusCircle, MessageSquare, TrendingUp } from 'lucide-react'
import './AdminDashboard.css'

export default function AdminDashboard() {
    const { posts } = useBlog()

    const publishedPosts = posts.filter(p => p.status === 'published')
    const draftPosts = posts.filter(p => p.status === 'draft')
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0)
    const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0)

    const recentPosts = [...posts].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 5)



    return (
        <div className="admin-layout">
            {/* Sidebar */}
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Dashboard</h1>
                    <Link to="/admin/editor" className="btn btn-primary">
                        <PlusCircle size={18} /> New Post
                    </Link>
                </header>

                {/* Stats */}
                <div className="admin-stats">
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--primary">
                            <FileText size={24} />
                        </div>
                        <div>
                            <span className="admin-stat-card__number">{publishedPosts.length}</span>
                            <span className="admin-stat-card__label">Published</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--warning">
                            <FileText size={24} />
                        </div>
                        <div>
                            <span className="admin-stat-card__number">{draftPosts.length}</span>
                            <span className="admin-stat-card__label">Drafts</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--accent">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <span className="admin-stat-card__number">{totalViews.toLocaleString()}</span>
                            <span className="admin-stat-card__label">Total Views</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--secondary">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <span className="admin-stat-card__number">{totalComments}</span>
                            <span className="admin-stat-card__label">Comments</span>
                        </div>
                    </div>
                </div>

                {/* Recent Posts */}
                <section className="admin-section">
                    <div className="admin-section__header">
                        <h2>Recent Posts</h2>
                        <Link to="/admin/posts" className="btn btn-ghost">View All</Link>
                    </div>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Views</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPosts.map((post) => (
                                    <tr key={post.id}>
                                        <td>
                                            <span className="admin-table__title">{post.title}</span>
                                        </td>
                                        <td>
                                            <span className="badge badge-primary">{post.category.replace('-', ' ')}</span>
                                        </td>
                                        <td>
                                            <span className={`admin-table__status admin-table__status--${post.status}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td>{post.views?.toLocaleString() || 0}</td>
                                        <td>
                                            <Link to={`/admin/editor/${post.id}`} className="btn btn-sm btn-ghost">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}
