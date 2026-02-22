import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Mail, MessageSquare, Send, Clock } from 'lucide-react'
import './Contact.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            // Save to Firestore
            await addDoc(collection(db, 'contacts'), {
                ...formData,
                createdAt: serverTimestamp(),
                read: false
            })

            setIsSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (err) {
            console.error('Error saving contact:', err)
            setError('Failed to send message. Please try again.')
        }

        setIsSubmitting(false)
    }

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <h1>Get in <em>Touch</em></h1>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>
            </section>

            <section className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2>Contact Information</h2>
                            <p>Fill out the form and our team will get back to you within 24 hours.</p>

                            <div className="contact-info__items">
                                <div className="contact-info__item">
                                    <div className="contact-info__icon">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>Hafsakhalid123@icloud.com</p>
                                    </div>
                                </div>
                                <div className="contact-info__item">
                                    <div className="contact-info__icon">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h3>Social</h3>
                                        <p>@aiearninghub</p>
                                    </div>
                                </div>
                                <div className="contact-info__item">
                                    <div className="contact-info__icon">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3>Response Time</h3>
                                        <p>Within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            {isSuccess ? (
                                <div className="contact-success">
                                    <div className="contact-success__icon">✓</div>
                                    <h3>Message Sent!</h3>
                                    <p>Thank you for reaching out. We'll get back to you soon.</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setIsSuccess(false)}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    {error && <div className="contact-error">{error}</div>}

                                    <div className="contact-form__row">
                                        <div className="contact-form__field">
                                            <label htmlFor="name">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="input"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="contact-form__field">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="input"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="contact-form__field">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            className="input"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="contact-form__field">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            className="input textarea"
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} /></>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
