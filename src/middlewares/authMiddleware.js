import { checkIfUserExists } from "../services/userService.js";
import { verifyJWT } from "../utilies/jwt.js";

export const isAuthenticated = async (req, res, next) => {
    // Check if jwt is passed in the header
    const token = req.headers["x-access-token"];

    if(!token) {
        return res.status(400).json({
            success: false,
            message: "Token is required"
        });
    }

    // Verify the token
    try {
        const response = verifyJWT(token);

        const doesUserExists = await checkIfUserExists(response.email);

        if(!doesUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = response;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

}

export const isAdmin = async (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized access therefore can't edit"
        });
    }
    // Now it is authorized admin panel therefore it can edit.

    next();
}

// Similiar we can define more role based on different role,but in our porject we have only 2 role therefore defining only one which is isAdmin.