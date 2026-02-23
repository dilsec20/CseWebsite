const pool = require("../db");

// In-memory rate limiter: track last log time per IP (max ~1000 entries)
const recentVisitors = new Map();
const RATE_LIMIT_MS = 60000; // Only log once per IP per 60 seconds

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
    const now = Date.now();
    for (const [ip, time] of recentVisitors) {
        if (now - time > RATE_LIMIT_MS * 2) recentVisitors.delete(ip);
    }
    if (recentVisitors.size > 1000) recentVisitors.clear();
}, 300000);

const visitorTracker = (req, res, next) => {
    // ALWAYS call next() immediately — never block the response
    next();

    try {
        // Skip static files
        if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map|json)$/)) {
            return;
        }

        // Skip ALL API calls — only track page loads
        if (req.path.startsWith('/api/')) {
            return;
        }

        // Only track GET requests (page loads)
        if (req.method !== 'GET') {
            return;
        }

        let ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (ip_address && typeof ip_address === 'string' && ip_address.includes(',')) {
            ip_address = ip_address.split(',')[0].trim();
        }
        if (ip_address && ip_address.length > 45) {
            ip_address = ip_address.substring(0, 45);
        }

        // Rate limit: skip if we logged this IP recently
        const lastLogged = recentVisitors.get(ip_address);
        if (lastLogged && (Date.now() - lastLogged) < RATE_LIMIT_MS) {
            return;
        }
        recentVisitors.set(ip_address, Date.now());

        const user_agent = req.headers['user-agent'];
        const page_url = req.originalUrl;
        const referrer = req.headers['referer'] || req.headers['referrer'] || null;

        // Fire and forget — never await, never block
        pool.query(
            "INSERT INTO visitor_logs (ip_address, user_agent, page_url, referrer) VALUES ($1, $2, $3, $4)",
            [ip_address, user_agent, page_url, referrer]
        ).catch(() => {
            // Silently ignore — visitor tracking is not critical
        });

    } catch (err) {
        // Silently ignore — never let tracking crash anything
    }
};

module.exports = visitorTracker;

