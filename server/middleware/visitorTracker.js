const pool = require("../db");

const visitorTracker = async (req, res, next) => {
    try {
        // Skip tracking for static files and common assets to reduce noise
        if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
            return next();
        }

        // Skip tracking for API calls if preferred, or track everything. 
        // Usually we want to track page loads. Since this is an SPA, 
        // the index.html load is the most important "visit".
        // But for now, we'll track all non-static GET requests to the root or API.

        // Improved logic: Track only initial page loads or significant API hits?
        // Simple approach: Track everything that isn't a static asset.

        const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const user_agent = req.headers['user-agent'];
        const page_url = req.originalUrl;

        // Fire and forget - don't await to avoid slowing down response
        pool.query(
            "INSERT INTO visitor_logs (ip_address, user_agent, page_url) VALUES ($1, $2, $3)",
            [ip_address, user_agent, page_url]
        ).catch(err => console.error('Visitor tracking error:', err.message));

        next();
    } catch (err) {
        console.error("Tracking middleware error:", err.message);
        next();
    }
};

module.exports = visitorTracker;
