
import React, { createContext, useContext, useState, useEffect } from 'react'

// Simple local auth - no Firebase required
const ADMIN_CREDENTIALS = {
    email: 'admin@aiearninghub.com',
    password: 'admin123'
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check for existing session
    useEffect(() => {
        const savedUser = localStorage.getItem('admin_user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    // Login
    const login = async (email, password) => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const userData = { email, isAdmin: true }
            setUser(userData)
            localStorage.setItem('admin_user', JSON.stringify(userData))
            return { success: true }
        }
        return { success: false, error: 'Invalid email or password' }
    }

    // Logout
    const logout = () => {
        setUser(null)
        localStorage.removeItem('admin_user')
        return { success: true }
    }

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
