import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { Twitter, Youtube, Linkedin, Facebook, Instagram } from 'lucide-react'
import './Footer.css'

const footerLinks = {
    content: [
        { path: '/blog', label: 'All Articles' },
        { path: '/ai-tools', label: 'AI Tools' },
        { path: '/freelancing', label: 'Freelancing' },
        { path: '/resources', label: 'Resources' },
    ],
    site: [
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
        { path: '/faq', label: 'FAQ' },
    ],
    legal: [
        { path: '/privacy-policy', label: 'Privacy' },
        { path: '/terms', label: 'Terms' },
        { path: '/disclaimer', label: 'Disclaimer' },
        { path: '/affiliate-disclosure', label: 'Affiliates' },
    ]
}

export default function Footer() {
    const { settings } = useBlog()
    const social = settings?.social || {}

    return (
        <footer className="footer">
            <div className="footer__inner container">
                <div className="footer__main">
                    {/* Brand */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-text">AI LEARNING HUB</span>
                        </Link>
                        <p className="footer__desc">
                            Practical AI guides for real income. No hype, just results.
                        </p>
                        <div className="footer__social">
                            {social.twitter && (
                                <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {social.facebook && (
                                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                            )}
                            {social.linkedin && (
                                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {social.instagram && (
                                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer__column">
                        <h4>Content</h4>
                        <div className="footer__links">
                            {footerLinks.content.map((link) => (
                                <Link key={link.path} to={link.path}>{link.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="footer__column">
                        <h4>Site</h4>
                        <div className="footer__links">
                            {footerLinks.site.map((link) => (
                                <Link key={link.path} to={link.path}>{link.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="footer__column">
                        <h4>Legal</h4>
                        <div className="footer__links">
                            {footerLinks.legal.map((link) => (
                                <Link key={link.path} to={link.path}>{link.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span>© {new Date().getFullYear()} AI Earning Hub</span>
                    <span>Built for humans</span>
                </div>
            </div>
        </footer>
    )
}
