import { useEffect } from 'react'
import { useBlog } from '../context/BlogContext'

export default function AdSenseScript() {
    const { settings } = useBlog()
    const adsenseId = settings?.adsenseId

    useEffect(() => {
        if (!adsenseId) return

        // Check if script already exists
        const existingScript = document.querySelector(`script[src*="adsbygoogle.js?client=${adsenseId}"]`)
        if (existingScript) return

        const script = document.createElement('script')
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`
        script.async = true
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)

        return () => {
            // Optional: remove script on unmount? usually not needed for ads
        }
    }, [adsenseId])

    return null
}
