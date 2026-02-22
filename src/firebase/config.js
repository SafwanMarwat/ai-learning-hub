// Firebase Configuration
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, logEvent } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyAqdtNq3HMTSB-KXLJJHg78t9dDeVrWiTc",
    authDomain: "ailearning-2bb30.firebaseapp.com",
    projectId: "ailearning-2bb30",
    storageBucket: "ailearning-2bb30.firebasestorage.app",
    messagingSenderId: "110633650253",
    appId: "1:110633650253:web:3f7687935f552c1ac4f404",
    measurementId: "G-HQT9MLR885"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)

// Analytics helper functions
export const trackPageView = (pageName) => {
    logEvent(analytics, 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname
    })
}

export const trackEvent = (eventName, params = {}) => {
    logEvent(analytics, eventName, params)
}

export const trackBlogView = (postTitle, postCategory) => {
    logEvent(analytics, 'view_item', {
        item_name: postTitle,
        item_category: postCategory
    })
}

export const trackSearch = (searchTerm) => {
    logEvent(analytics, 'search', {
        search_term: searchTerm
    })
}

export default app
