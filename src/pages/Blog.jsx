import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import SearchBar from '../components/SearchBar'
import AdSlot from '../components/AdSlot'
import './Blog.css'

export default function Blog() {
    const [searchParams] = useSearchParams()
    const { getPublishedPosts, categories, searchPosts } = useBlog()
    const [filteredPosts, setFilteredPosts] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9

    const categoryParam = searchParams.get('category')
    const showSearch = searchParams.get('search') === 'true'

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam)
        }
    }, [categoryParam])

    useEffect(() => {
        const allPosts = getPublishedPosts()
        if (activeCategory === 'all') {
            setFilteredPosts(allPosts)
        } else {
            setFilteredPosts(allPosts.filter(post => post.category === activeCategory))
        }
        setCurrentPage(1)
    }, [activeCategory, getPublishedPosts])

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

    return (
        <main className="blog-page">
            <div className="blog-page__header">
                <div className="container">
                    <h1>Blog</h1>
                    <p>Explore our collection of articles on AI, freelancing, and online earning</p>
                    <div className="blog-page__search">
                        <SearchBar autoFocus={showSearch} />
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Category Filters */}
                <div className="blog-page__filters">
                    <button
                        className={`blog-page__filter ${activeCategory === 'all' ? 'is-active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >
                        All Posts
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`blog-page__filter ${activeCategory === category.id ? 'is-active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <AdSlot type="horizontal" />

                {/* Posts Grid */}
                {currentPosts.length > 0 ? (
                    <>
                        <div className="blog-page__grid">
                            {currentPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="blog-page__pagination">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <div className="blog-page__pagination-pages">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            className={`blog-page__pagination-btn ${currentPage === page ? 'is-active' : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="blog-page__empty">
                        <h3>No posts found</h3>
                        <p>Try selecting a different category or check back later for new content.</p>
                        <button className="btn btn-primary" onClick={() => setActiveCategory('all')}>
                            View All Posts
                        </button>
                    </div>
                )}

                <AdSlot type="horizontal" />
            </div>
        </main>
    )
}
