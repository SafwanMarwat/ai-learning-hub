import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Search, Moon, Sun, ChevronDown } from 'lucide-react'
import './Header.css'

const mainNavItems = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    {
        label: 'Learn',
        children: [
            { path: '/ai-tools', label: 'AI Tools Reviews' },
            { path: '/ai-earning-guides', label: 'AI Earning Guides' },
            { path: '/freelancing', label: 'Freelancing with AI' },
            { path: '/online-earning', label: 'Online Earning Basics' },
        ]
    },
    { path: '/resources', label: 'Resources' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setOpenDropdown(null)
    }, [location])

    useEffect(() => {
        const savedTheme = localStorage.getItem('aiHub_theme')
        if (savedTheme === 'dark') {
            setIsDark(true)
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
        localStorage.setItem('aiHub_theme', newTheme ? 'dark' : 'light')
    }

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__container container">
                {/* Logo */}
                <Link to="/" className="header__logo">
                    <span className="header__logo-text text-magic">AI LEARNING HUB</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header__nav">
                    {mainNavItems.map((item, index) => (
                        item.children ? (
                            <div
                                key={index}
                                className="header__dropdown"
                                onMouseEnter={() => setOpenDropdown(index)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button className="header__nav-link header__dropdown-trigger">
                                    {item.label}
                                    <ChevronDown size={16} />
                                </button>
                                <div className={`header__dropdown-menu ${openDropdown === index ? 'is-open' : ''}`}>
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.path}
                                            to={child.path}
                                            className="header__dropdown-item"
                                        >
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `header__nav-link ${isActive ? 'is-active' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    ))}
                </nav>

                {/* Actions */}
                <div className="header__actions">
                    <Link to="/blog?search=true" className="header__action-btn" aria-label="Search">
                        <Search size={20} />
                    </Link>
                    <button
                        className="header__action-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ?
                            <Sun size={20} className="theme-toggle-anim" key="sun" /> :
                            <Moon size={20} className="theme-toggle-anim" key="moon" />
                        }
                    </button>
                    <button
                        className="header__mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`header__mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
                <nav className="header__mobile-nav">
                    {mainNavItems.map((item, index) => (
                        item.children ? (
                            <div key={index} className="header__mobile-dropdown">
                                <button
                                    className="header__mobile-link"
                                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                                >
                                    {item.label}
                                    <ChevronDown size={16} className={openDropdown === index ? 'rotated' : ''} />
                                </button>
                                <div className={`header__mobile-submenu ${openDropdown === index ? 'is-open' : ''}`}>
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.path}
                                            to={child.path}
                                            className="header__mobile-sublink"
                                        >
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `header__mobile-link ${isActive ? 'is-active' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    ))}
                </nav>
            </div>
        </header>
    )
}
