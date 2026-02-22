import './AdSlot.css'

export default function AdSlot({ type = 'horizontal', className = '' }) {
    // In production, replace this with actual AdSense code
    // <ins class="adsbygoogle"
    //   style="display:block"
    //   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    //   data-ad-slot="XXXXXXXXXX"
    //   data-ad-format="auto"
    //   data-full-width-responsive="true"></ins>
    // <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

    const sizes = {
        horizontal: '728 x 90',
        vertical: '300 x 250',
        large: '970 x 250',
        inline: 'Responsive'
    }

    return (
        <div className={`ad-slot ad-slot--${type} ${className}`}>
            <span className="ad-slot__label">Advertisement</span>
            <span className="ad-slot__size">{sizes[type]}</span>
            <span className="ad-slot__placeholder">AdSense Placeholder</span>
        </div>
    )
}
