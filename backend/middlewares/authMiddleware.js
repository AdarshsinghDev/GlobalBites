import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id };

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
export default authMiddleware