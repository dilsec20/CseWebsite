const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        // 1. Get token from header
        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json({ error: "Not Authorized - No token provided" });
        }

        // 2. Verify token
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        // Extract user ID from payload (payload.user.id)
        req.user = payload.user.id;
        next();
    } catch (err) {
        console.error('[Authorization] Error:', err.message);
        return res.status(403).json({ error: "Not Authorized - Invalid token" });
    }
};
