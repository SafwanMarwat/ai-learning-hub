import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useBlog } from '../../context/BlogContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Save, ArrowLeft, Image, Upload, X, Loader } from 'lucide-react'
import './BlogEditor.css'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image',
    'color', 'background'
]

export default function BlogEditor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getPostById, createPost, updatePost, uploadImage, categories } = useBlog()
    const isEditing = Boolean(id)
    const fileInputRef = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'ai-tools',
        tags: '',
        featuredImage: '',
        status: 'draft',
        featured: false,
        readTime: '5 min'
    })
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [error, setError] = useState('')

    // Load post data for editing
    useEffect(() => {
        const loadPost = async () => {
            if (isEditing) {
                const post = await getPostById(id)
                if (post) {
                    setFormData({
                        title: post.title || '',
                        excerpt: post.excerpt || '',
                        content: post.content || '',
                        category: post.category || 'ai-tools',
                        tags: post.tags?.join(', ') || '',
                        featuredImage: post.featuredImage || '',
                        status: post.status || 'draft',
                        featured: post.featured || false,
                        readTime: post.readTime || '5 min'
                    })
                }
            }
        }
        loadPost()
    }, [id, isEditing, getPostById])

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be less than 5MB')
            return
        }

        setIsUploading(true)
        setError('')

        const result = await uploadImage(file)

        if (result.success) {
            setFormData(prev => ({ ...prev, featuredImage: result.url }))
        } else {
            setError('Failed to upload image: ' + result.error)
        }

        setIsUploading(false)
    }

    // Submit form
    const handleSubmit = async (e, status = formData.status) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            setError('Please enter a title')
            return
        }

        setIsSaving(true)
        setError('')

        const postData = {
            ...formData,
            status,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            author: 'AI Earning Hub'
        }

        let result
        if (isEditing) {
            result = await updatePost(id, postData)
        } else {
            result = await createPost(postData)
        }

        setIsSaving(false)

        if (result.success) {
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
            if (!isEditing) {
                navigate('/admin/posts')
            }
        } else {
            setError(result.error || 'Failed to save post')
        }
    }



    return (
        <div className="admin-layout">
            {/* Sidebar */}
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <div className="admin-header__back">
                        <Link to="/admin/posts" className="btn btn-ghost">
                            <ArrowLeft size={18} /> Back to Posts
                        </Link>
                        <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
                    </div>
                    <div className="admin-header__actions">
                        {saveSuccess && <span className="editor-save-success">✓ Saved!</span>}
                        {error && <span className="editor-error">{error}</span>}
                        <button
                            className="btn btn-secondary"
                            onClick={(e) => handleSubmit(e, 'draft')}
                            disabled={isSaving}
                        >
                            Save Draft
                        </button>
                        <button
                            className="btn btn-accent"
                            onClick={(e) => handleSubmit(e, 'published')}
                            disabled={isSaving}
                        >
                            <Save size={18} /> {isSaving ? 'Saving...' : 'Publish'}
                        </button>
                    </div>
                </header>

                <form className="editor-form">
                    <div className="editor-grid">
                        {/* Main Editor */}
                        <div className="editor-main">
                            <div className="editor-field">
                                <label htmlFor="title">Post Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="input editor-title-input"
                                    placeholder="Enter post title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="editor-field">
                                <label htmlFor="excerpt">Excerpt</label>
                                <textarea
                                    id="excerpt"
                                    className="input textarea"
                                    placeholder="Brief summary of your post..."
                                    rows="3"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                />
                            </div>

                            <div className="editor-field">
                                <label>Content</label>
                                <div className="editor-quill-wrapper">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(value) => setFormData({ ...formData, content: value })}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Write your article content here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="editor-sidebar">
                            <div className="editor-panel">
                                <h3>Post Settings</h3>

                                <div className="editor-field">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        className="input"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="editor-field">
                                    <label htmlFor="readTime">Read Time</label>
                                    <input
                                        type="text"
                                        id="readTime"
                                        className="input"
                                        placeholder="5 min"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    />
                                </div>

                                <div className="editor-field">
                                    <label htmlFor="tags">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        id="tags"
                                        className="input"
                                        placeholder="AI, Freelancing, Tips"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>

                                <div className="editor-field">
                                    <label className="editor-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        />
                                        <span>Mark as Featured</span>
                                    </label>
                                </div>
                            </div>

                            <div className="editor-panel">
                                <h3><Image size={18} /> Featured Image</h3>

                                {/* Image Upload */}
                                <div className="editor-upload">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />

                                    {formData.featuredImage ? (
                                        <div className="editor-image-preview">
                                            <img src={formData.featuredImage} alt="Preview" />
                                            <button
                                                type="button"
                                                className="editor-image-remove"
                                                onClick={() => setFormData({ ...formData, featuredImage: '' })}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            className="editor-upload-btn"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading}
                                        >
                                            {isUploading ? (
                                                <>
                                                    <Loader size={20} className="animate-spin" /> Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={20} /> Upload Image
                                                </>
                                            )}
                                        </button>
                                    )}

                                    <p className="editor-upload-hint">PNG, JPG up to 5MB</p>
                                </div>

                                {/* Or use URL */}
                                <div className="editor-field">
                                    <label htmlFor="imageUrl">Or paste image URL</label>
                                    <input
                                        type="url"
                                        id="imageUrl"
                                        className="input"
                                        placeholder="https://..."
                                        value={formData.featuredImage}
                                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}
