import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useBlog } from '../../context/BlogContext'
import { PlusCircle, Trash2, Edit, Search, Eye } from 'lucide-react'
import './AdminDashboard.css'

export default function ManagePosts() {
    const { posts = [], deletePost } = useBlog()
    const navigate = useNavigate()

    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredPosts = posts.filter(post => {
        const matchesFilter = filter === 'all' || post.status === filter
        const matchesSearch =
            post.title?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleDelete = async (id, title) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${title}"?`
        )
        if (!confirmed) return

        await deletePost(id)
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <h1>All Posts</h1>
                    <Link to="/admin/editor" className="btn btn-primary">
                        <PlusCircle size={18} /> New Post
                    </Link>
                </header>

                {/* Filters */}
                <div className="admin-filters">
                    <div className="admin-search">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.target.value)
                            }
                        />
                    </div>

                    <div className="admin-filter-buttons">
                        <button
                            className={`btn btn-sm ${
                                filter === 'all'
                                    ? 'btn-primary'
                                    : 'btn-ghost'
                            }`}
                            onClick={() => setFilter('all')}
                        >
                            All ({posts.length})
                        </button>

                        <button
                            className={`btn btn-sm ${
                                filter === 'published'
                                    ? 'btn-primary'
                                    : 'btn-ghost'
                            }`}
                            onClick={() => setFilter('published')}
                        >
                            Published (
                            {posts.filter(p => p.status === 'published')
                                .length}
                            )
                        </button>

                        <button
                            className={`btn btn-sm ${
                                filter === 'draft'
                                    ? 'btn-primary'
                                    : 'btn-ghost'
                            }`}
                            onClick={() => setFilter('draft')}
                        >
                            Drafts (
                            {posts.filter(p => p.status === 'draft').length}
                            )
                        </button>
                    </div>
                </div>

                {/* Posts Table */}
                <section className="admin-section">
                    {filteredPosts.length > 0 ? (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Views</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPosts.map((post) => (
                                        <tr key={post.id}>
                                            <td>
                                                <div className="admin-table__post-title">
                                                    {post.featuredImage && (
                                                        <img
                                                            src={post.featuredImage}
                                                            alt=""
                                                        />
                                                    )}
                                                    <span>
                                                        {post.title}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="badge badge-primary">
                                                    {post.category?.replace(
                                                        '-',
                                                        ' '
                                                    )}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={`admin-table__status admin-table__status--${post.status}`}
                                                >
                                                    {post.status}
                                                </span>
                                            </td>

                                            <td>
                                                {formatDate(
                                                    post.createdAt
                                                )}
                                            </td>

                                            <td>
                                                {post.views?.toLocaleString() ||
                                                    0}
                                            </td>

                                            <td>
                                                <div className="admin-table__actions">
                                                    <Link
                                                        to={`/admin/editor/${post.id}`}
                                                        className="admin-table__action"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>

                                                    <Link
                                                        to={`/blog/${post.slug}`}
                                                        className="admin-table__action"
                                                        target="_blank"
                                                        title="View"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>

                                                    <button
                                                        className="admin-table__action admin-table__action--danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                post.id,
                                                                post.title
                                                            )
                                                        }
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="admin-empty">
                            <p>No posts found.</p>
                            <Link
                                to="/admin/editor"
                                className="btn btn-primary"
                            >
                                Create Your First Post
                            </Link>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}