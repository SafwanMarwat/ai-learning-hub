import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { BlogProvider } from './context/BlogContext'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Resources from './pages/Resources'

// Category Pages
import AIToolsReviews from './pages/AIToolsReviews'
import AIEarningGuides from './pages/AIEarningGuides'
import FreelancingWithAI from './pages/FreelancingWithAI'
import OnlineEarningBasics from './pages/OnlineEarningBasics'

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import Terms from './pages/legal/Terms'
import Disclaimer from './pages/legal/Disclaimer'
import CookiePolicy from './pages/legal/CookiePolicy'
import DMCA from './pages/legal/DMCA'
import AffiliateDisclosure from './pages/legal/AffiliateDisclosure'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import BlogEditor from './pages/admin/BlogEditor'
import ManagePosts from './pages/admin/ManagePosts'
import AdminSettings from './pages/admin/AdminSettings'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdSenseScript from './components/AdSenseScript'

function PublicLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BlogProvider>
                    <AdSenseScript />
                    <Router>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
                            <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
                            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                            <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
                            <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />

                            {/* Category Pages */}
                            <Route path="/ai-tools" element={<PublicLayout><AIToolsReviews /></PublicLayout>} />
                            <Route path="/ai-earning-guides" element={<PublicLayout><AIEarningGuides /></PublicLayout>} />
                            <Route path="/freelancing" element={<PublicLayout><FreelancingWithAI /></PublicLayout>} />
                            <Route path="/online-earning" element={<PublicLayout><OnlineEarningBasics /></PublicLayout>} />

                            {/* Legal Pages */}
                            <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
                            <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
                            <Route path="/disclaimer" element={<PublicLayout><Disclaimer /></PublicLayout>} />
                            <Route path="/cookie-policy" element={<PublicLayout><CookiePolicy /></PublicLayout>} />
                            <Route path="/dmca" element={<PublicLayout><DMCA /></PublicLayout>} />
                            <Route path="/affiliate-disclosure" element={<PublicLayout><AffiliateDisclosure /></PublicLayout>} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin/dashboard" element={
                                <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                            } />
                            <Route path="/admin/posts" element={
                                <ProtectedRoute><ManagePosts /></ProtectedRoute>
                            } />
                            <Route path="/admin/editor" element={
                                <ProtectedRoute><BlogEditor /></ProtectedRoute>
                            } />
                            <Route path="/admin/editor/:id" element={
                                <ProtectedRoute><BlogEditor /></ProtectedRoute>
                            } />
                            <Route path="/admin/settings" element={
                                <ProtectedRoute><AdminSettings /></ProtectedRoute>
                            } />
                        </Routes>
                    </Router>
                </BlogProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
