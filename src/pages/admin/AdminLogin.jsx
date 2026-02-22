import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import './AdminLogin.css'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const result = await login(email, password)

        if (result.success) {
            navigate('/admin/dashboard')
        } else {
            setError(result.error)
        }

        setIsLoading(false)
    }

    return (
        <main className="admin-login">
            <div className="admin-login__container">
                <Link to="/" className="admin-login__back">
                    <ArrowLeft size={18} />
                    Back to site
                </Link>

                <div className="admin-login__header">
                    <div className="admin-login__logo">AI LEARNING HUB</div>
                    <h1>Welcome back</h1>
                    <p>Sign in to write and publish articles</p>
                </div>

                {error && (
                    <div className="admin-login__error">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form className="admin-login__form" onSubmit={handleSubmit}>
                    <div className="admin-login__field">
                        <label htmlFor="email">Email</label>
                        <div className="admin-login__input-wrapper">
                            <Mail size={20} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-login__field">
                        <label htmlFor="password">Password</label>
                        <div className="admin-login__input-wrapper">
                            <Lock size={20} />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="admin-login__setup">
                    <p>First time? Create an admin account in Firebase Console:</p>
                    <ol>
                        <li>Go to Firebase Console → Authentication</li>
                        <li>Click "Add user"</li>
                        <li>Enter your email & password</li>
                    </ol>
                </div>
            </div>
        </main>
    )
}
