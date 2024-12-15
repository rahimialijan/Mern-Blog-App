import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log("Token missing");
        return next(errorHandler(401, "Access token is missing or invalid"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("JWT Error:", err.message);
            return next(errorHandler(403, "Invalid or expired token"));
        }
        console.log("Decoded User:", user); // Log the user object to check its structure
        req.user = user; // Attach user payload to the request
        next();
    });
};

