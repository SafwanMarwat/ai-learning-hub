import { createContext, useContext, useState, useEffect } from 'react'
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    setDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    increment
} from 'firebase/firestore'

import { db } from '../firebase/config'

import { placeholderPosts } from '../data/placeholderData'

const BlogContext = createContext()

// Default categories
const defaultCategories = [
    { id: 'ai-tools', name: 'AI Tools', color: 'purple' },
    { id: 'freelancing', name: 'Freelancing', color: 'blue' },
    { id: 'earning-guides', name: 'Earning Guides', color: 'green' },
    { id: 'online-basics', name: 'Online Basics', color: 'orange' },
    { id: 'resources', name: 'Resources', color: 'pink' }
]

// Track which post IDs have already been counted this session
const viewedPosts = new Set()

export function BlogProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [categories] = useState(defaultCategories)
    const [settings, setSettings] = useState({
        social: { twitter: '', facebook: '', linkedin: '', instagram: '' },
        adsenseId: ''
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch all posts from Firestore
    const fetchPosts = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(db, 'posts'),
                orderBy('createdAt', 'desc')
            )
            const snapshot = await getDocs(q)
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
            }))

            if (postsData.length === 0) {
                setPosts(placeholderPosts)
            } else {
                const hasPublished = postsData.some(p => p.status === 'published')
                if (!hasPublished) {
                    setPosts([...postsData, ...placeholderPosts])
                } else {
                    setPosts(postsData)
                }
            }
            setError(null)
        } catch (err) {
            console.error('Error fetching posts:', err)
            setError('Failed to load posts')
        } finally {
            setLoading(false)
        }
    }

    // Fetch global settings
    const fetchSettings = async () => {
        try {
            const docRef = doc(db, 'settings', 'global')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setSettings(docSnap.data())
            }
        } catch (err) {
            console.error('Error fetching settings:', err)
        }
    }

    // Update settings
    const updateSettings = async (newSettings) => {
        try {
            const docRef = doc(db, 'settings', 'global')
            await setDoc(docRef, newSettings, { merge: true })
            setSettings(prev => ({ ...prev, ...newSettings }))
            return { success: true }
        } catch (err) {
            console.error('Error updating settings:', err)
            return { success: false, error: err.message }
        }
    }

    // Load posts and settings on mount
    useEffect(() => {
        fetchPosts()
        fetchSettings()
    }, [])

    // Get single post by slug
    const getPostBySlug = async (slug) => {
        try {
            const q = query(collection(db, 'posts'), where('slug', '==', slug))
            const snapshot = await getDocs(q)
            if (snapshot.empty) return null
            const doc = snapshot.docs[0]
            return { id: doc.id, ...doc.data() }
        } catch (err) {
            console.error('Error fetching post:', err)
            return null
        }
    }

    // Get single post by ID
    const getPostById = async (id) => {
        try {
            const docRef = doc(db, 'posts', id)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) return null
            return { id: docSnap.id, ...docSnap.data() }
        } catch (err) {
            console.error('Error fetching post:', err)
            return null
        }
    }

    // Create new post
    const createPost = async (postData) => {
        try {
            const slug = generateSlug(postData.title)
            const newPost = {
                ...postData,
                slug,
                views: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }
            const docRef = await addDoc(collection(db, 'posts'), newPost)
            await fetchPosts()
            return { success: true, id: docRef.id, slug }
        } catch (err) {
            console.error('Error creating post:', err)
            return { success: false, error: err.message }
        }
    }

    // Update existing post
    const updatePost = async (id, postData) => {
        try {
            const docRef = doc(db, 'posts', id)
            await updateDoc(docRef, {
                ...postData,
                updatedAt: serverTimestamp()
            })
            await fetchPosts()
            return { success: true }
        } catch (err) {
            console.error('Error updating post:', err)
            return { success: false, error: err.message }
        }
    }

    // Delete post
    const deletePost = async (id) => {
        try {
            await deleteDoc(doc(db, 'posts', id))
            await fetchPosts()
            return { success: true }
        } catch (err) {
            console.error('Error deleting post:', err)
            return { success: false, error: err.message }
        }
    }

    // Increment view count — fixes:
    // 1. Local state was never updated so UI always showed stale count
    // 2. No deduplication, so every re-render would fire another increment
    const incrementViews = async (id) => {
        // Don't count the same post twice in one session
        if (viewedPosts.has(id)) return
        viewedPosts.add(id)

        try {
            const docRef = doc(db, 'posts', id)
            await updateDoc(docRef, { views: increment(1) })

            // Update local state immediately so UI reflects the new count
            setPosts(prev =>
                prev.map(p =>
                    p.id === id ? { ...p, views: (p.views || 0) + 1 } : p
                )
            )
        } catch (err) {
            console.error('Error incrementing views:', err)
            // Roll back the session dedup if Firestore write failed
            viewedPosts.delete(id)
        }
    }

    // Add comment to a post
    const addComment = async (postId, commentData) => {
        try {
            const postRef = doc(db, 'posts', postId)

            const newComment = {
                id: Date.now().toString(),
                name: commentData.name,
                content: commentData.content,
                createdAt: new Date().toISOString()
            }

            const postSnap = await getDoc(postRef)
            if (!postSnap.exists()) return

            const existingComments = postSnap.data().comments || []

            await updateDoc(postRef, {
                comments: [...existingComments, newComment]
            })

            await fetchPosts()
            return { success: true }

        } catch (err) {
            console.error('Error adding comment:', err)
            return { success: false, error: err.message }
        }
    }

    // Upload image to Cloudinary
    const uploadImage = async (file) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'AIEARNINGHUB')

            const response = await fetch(
                'https://api.cloudinary.com/v1_1/do6mpxuqw/image/upload',
                {
                    method: 'POST',
                    body: formData
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error?.message || 'Upload failed')
            }

            return { success: true, url: data.secure_url }

        } catch (err) {
            console.error('Cloudinary upload error:', err)
            return { success: false, error: err.message }
        }
    }

    // Generate URL-friendly slug
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-' + Date.now().toString(36)
    }

    // Helper functions
    const getPublishedPosts = () => posts.filter(p => p.status === 'published')
    const getDraftPosts = () => posts.filter(p => p.status === 'draft')
    const getFeaturedPosts = () => posts.filter(p => p.featured && p.status === 'published')
    const getPostsByCategory = (categoryId) => posts.filter(p => p.category === categoryId && p.status === 'published')

    // Stats for admin dashboard
    const getStats = () => ({
        totalPosts: posts.length,
        published: getPublishedPosts().length,
        drafts: getDraftPosts().length,
        totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0)
    })

    // Get post from state (synchronous)
    const getPost = (slug) => {
        return posts.find(p => p.slug === slug)
    }

    // Search posts (used by SearchBar)
    const searchPosts = (query) => {
        const lowerQuery = query.toLowerCase()

        return posts.filter(post =>
            post.status === 'published' && (
                post.title?.toLowerCase().includes(lowerQuery) ||
                post.excerpt?.toLowerCase().includes(lowerQuery) ||
                post.category?.toLowerCase().includes(lowerQuery)
            )
        )
    }

    const value = {
        posts,
        categories,
        loading,
        error,
        settings,
        updateSettings,
        fetchPosts,
        getPost,
        getPostBySlug,
        getPostById,
        createPost,
        updatePost,
        deletePost,
        incrementViews,
        addComment,
        uploadImage,
        getPublishedPosts,
        getDraftPosts,
        getFeaturedPosts,
        getPostsByCategory,
        getStats,
        searchPosts
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}

export function useBlog() {
    const context = useContext(BlogContext)
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider')
    }
    return context
}