import React, { useEffect } from 'react';

const GoogleAd = ({
    className = "",
    style = {},
    client = "ca-pub-6770525539785120",
    slot = "XXXXXXXXXX",
    format = "auto",
    responsive = "true",
    layoutKey = ""
}) => {
    useEffect(() => {
        try {
            if (window.adsbygoogle) {
                // Push the ad to the queue
                // We use a timeout to ensure the DOM element is ready
                setTimeout(() => {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }, 100);
            }
        } catch (e) {
            console.error("AdSense Error:", e);
        }
    }, []);

    if (process.env.NODE_ENV === 'development') {
        return (
            <div
                className={`bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-500 text-xs text-center p-2 ${className}`}
                style={{ ...style, minHeight: '250px' }}
            >
                <div className="space-y-1">
                    <p className="font-bold">Google Ad Placeholder</p>
                    <p>Slot: {slot}</p>
                    <p>Format: {format}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`ad-container ${className}`} style={style}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
                data-ad-layout-key={layoutKey || undefined}>
            </ins>
        </div>
    );
};

export default GoogleAd;
