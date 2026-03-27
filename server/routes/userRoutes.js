import express from 'express';
import User from "../models/User.js";
import { registerUser, loginUser, getUser, getPublishedImages } from '../controllers/usercontroller.js';
import { protect } from '../middlewares/auth.js';
const userRouter = express.Router();

// Define user-related routes here


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
 userRouter.get('/data', protect, getUser);
 userRouter.get('/published-images',  getPublishedImages);

export default userRouter;