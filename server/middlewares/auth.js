
import jwt from 'jsonwebtoken';
import User from "../models/User.js"
// // export const protect = async (req, res, next) => {
// //     let token = req.headers.authorization;

// //     if (!token){
// //          return res.json({ success: false, message: "No token provided" });
// // }

// //     try {
// //                 // Remove "Bearer " if it exists
// //         if (token.startsWith('Bearer')) {
// //             token = token.split(' ')[1];
// //         }

// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //        const userId = decoded.id;
// //        const user = await User.findById(userId);
// //        if(!user) {
// //         return res.json({ success: false, message: "Not authorized, user not found" });
// //        }
// //        req.user = user;
// //        next();
// //     } catch (error) {
// //         return res.status(401).json({ success: false, message: "Not authorized, token failed" });
// //     }
// // };
export const protect = async (req, res,next) => {
    console.log("Next type:", typeof next);
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Remove Bearer
        if (token.startsWith('Bearer')) {
            token = token.split(' ')[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;

       next(); // ✅ MUST be here
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token failed"
        });
    }
};
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     // 1. Check Authorization Header (Standard)
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     } 
//     // 2. Check Query Params (For Stripe Redirects)
//     else if (req.query.token) {
//       token = req.query.token;
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     // Verify Token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next(); 
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Token failed or expired"
//     });
//   }
// };