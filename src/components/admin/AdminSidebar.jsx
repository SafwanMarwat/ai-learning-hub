import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, PlusCircle, LogOut, Eye, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import '../../pages/admin/AdminDashboard.css'

export default function AdminSidebar() {
    const location = useLocation()
    const { logout } = useAuth()

    const isActive = (path) => location.pathname === path

    const handleLogout = () => {
        logout()
        window.location.href = '/admin/login'
    }

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__header">
                <div className="admin-sidebar__logo">AI LEARNING HUB</div>
                <span>Admin Panel</span>
            </div>

            <nav className="admin-sidebar__nav">
                <Link to="/admin/dashboard" className={`admin-sidebar__link ${isActive('/admin/dashboard') ? 'is-active' : ''}`}>
                    <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link to="/admin/posts" className={`admin-sidebar__link ${isActive('/admin/posts') ? 'is-active' : ''}`}>
                    <FileText size={20} /> All Posts
                </Link>
                <Link to="/admin/editor" className={`admin-sidebar__link ${isActive('/admin/editor') ? 'is-active' : ''}`}>
                    <PlusCircle size={20} /> New Post
                </Link>
                <Link to="/admin/settings" className={`admin-sidebar__link ${isActive('/admin/settings') ? 'is-active' : ''}`}>
                    <Settings size={20} /> Settings
                </Link>
            </nav>

            <div className="admin-sidebar__footer">
                <Link to="/" className="admin-sidebar__link" target="_blank">
                    <Eye size={20} /> View Site
                </Link>
                <button className="admin-sidebar__link" onClick={handleLogout}>
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </aside>
    )
}
