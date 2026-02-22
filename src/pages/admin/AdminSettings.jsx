import { useState, useEffect } from 'react'
import { useBlog } from '../../context/BlogContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Save, Globe, DollarSign, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react'
import './BlogEditor.css' // Reuse validator styles

export default function AdminSettings() {
    const { settings, updateSettings } = useBlog()
    const [formData, setFormData] = useState({
        social: {
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: ''
        },
        adsenseId: ''
    })
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Load initial settings
    useEffect(() => {
        if (settings) {
            setFormData({
                social: {
                    twitter: settings.social?.twitter || '',
                    facebook: settings.social?.facebook || '',
                    linkedin: settings.social?.linkedin || '',
                    instagram: settings.social?.instagram || ''
                },
                adsenseId: settings.adsenseId || ''
            })
        }
    }, [settings])

    const handleChange = (section, field, value) => {
        if (section === 'social') {
            setFormData(prev => ({
                ...prev,
                social: { ...prev.social, [field]: value }
            }))
        } else {
            setFormData(prev => ({ ...prev, [field]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        setMessage({ type: '', text: '' })

        const result = await updateSettings(formData)

        setIsSaving(false)
        if (result.success) {
            setMessage({ type: 'success', text: 'Settings saved successfully!' })
            setTimeout(() => setMessage({ type: '', text: '' }), 3000)
        } else {
            setMessage({ type: 'error', text: 'Failed to save settings: ' + result.error })
        }
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <h1>Site Settings</h1>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >
                        <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </header>

                {message.text && (
                    <div className={`editor-message ${message.type === 'success' ? 'editor-save-success' : 'editor-error'}`} style={{ display: 'block', marginBottom: '1rem' }}>
                        {message.text}
                    </div>
                )}

                <div className="editor-grid">
                    <div className="editor-main">
                        <section className="admin-section" style={{ marginBottom: '2rem' }}>
                            <div className="admin-section__header">
                                <h2><DollarSign size={20} /> Monetization (AdSense)</h2>
                            </div>
                            <div className="editor-field">
                                <label>Google AdSense Publisher ID</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                                    value={formData.adsenseId}
                                    onChange={(e) => handleChange('root', 'adsenseId', e.target.value)}
                                />
                                <p className="editor-upload-hint">
                                    Enter your Publisher ID found in AdSense Account &gt; Settings &gt; Account Information.
                                </p>
                            </div>
                        </section>

                        <section className="admin-section">
                            <div className="admin-section__header">
                                <h2><Globe size={20} /> Social Media Links</h2>
                            </div>
                            <div className="editor-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="editor-field">
                                    <label><Twitter size={16} /> Twitter / X</label>
                                    <input
                                        type="url"
                                        className="input"
                                        placeholder="https://twitter.com/..."
                                        value={formData.social.twitter}
                                        onChange={(e) => handleChange('social', 'twitter', e.target.value)}
                                    />
                                </div>
                                <div className="editor-field">
                                    <label><Facebook size={16} /> Facebook</label>
                                    <input
                                        type="url"
                                        className="input"
                                        placeholder="https://facebook.com/..."
                                        value={formData.social.facebook}
                                        onChange={(e) => handleChange('social', 'facebook', e.target.value)}
                                    />
                                </div>
                                <div className="editor-field">
                                    <label><Linkedin size={16} /> LinkedIn</label>
                                    <input
                                        type="url"
                                        className="input"
                                        placeholder="https://linkedin.com/..."
                                        value={formData.social.linkedin}
                                        onChange={(e) => handleChange('social', 'linkedin', e.target.value)}
                                    />
                                </div>
                                <div className="editor-field">
                                    <label><Instagram size={16} /> Instagram</label>
                                    <input
                                        type="url"
                                        className="input"
                                        placeholder="https://instagram.com/..."
                                        value={formData.social.instagram}
                                        onChange={(e) => handleChange('social', 'instagram', e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
