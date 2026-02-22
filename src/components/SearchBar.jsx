import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useBlog } from '../context/BlogContext'
import { Link } from 'react-router-dom'
import './SearchBar.css'

export default function SearchBar({ autoFocus = false, onClose }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const { searchPosts } = useBlog()
    const inputRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus()
        }
    }, [autoFocus])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (query.trim().length >= 2) {
            const searchResults = searchPosts(query)
            setResults(searchResults.slice(0, 5))
            setIsOpen(true)
        } else {
            setResults([])
            setIsOpen(false)
        }
    }, [query, searchPosts])

    const handleClear = () => {
        setQuery('')
        setResults([])
        setIsOpen(false)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleResultClick = () => {
        setQuery('')
        setResults([])
        setIsOpen(false)
        if (onClose) onClose()
    }

    return (
        <div className="search-bar" ref={containerRef}>
            <div className="search-bar__input-wrapper">
                <Search size={20} className="search-bar__icon" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-bar__input"
                />
                {query && (
                    <button className="search-bar__clear" onClick={handleClear}>
                        <X size={18} />
                    </button>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <div className="search-bar__dropdown">
                    {results.map((post) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="search-bar__result"
                            onClick={handleResultClick}
                        >
                            <img src={post.featuredImage} alt="" className="search-bar__result-image" />
                            <div className="search-bar__result-content">
                                <span className="search-bar__result-title">{post.title}</span>
                                <span className="search-bar__result-category">
                                    {post.category.replace('-', ' ')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isOpen && query.length >= 2 && results.length === 0 && (
                <div className="search-bar__dropdown">
                    <div className="search-bar__no-results">
                        No articles found for "{query}"
                    </div>
                </div>
            )}
        </div>
    )
}
