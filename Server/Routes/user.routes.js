import { Router } from "express";
import { login, logout, register,getProfile, forgotPassword, resetPassword, change_password, update_user, contactUs, useStats } from "../Controllers/user.controller.js";
import { authorisedRole, isLoggedIn } from "../Middleware/jwtAuth.midlleware.js";
import upload from "../Middleware/multer.midlleware.js";

const router=Router();

router.post('/register',upload.single("avatar"),register);
// router.post('/register',register)
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/change-password',isLoggedIn,change_password);
router.put('/update/:id', isLoggedIn, upload.single("avatar"), update_user);
router.post('/contact-us', contactUs)
router.get('/alluser/count',isLoggedIn, authorisedRole('ADMIN'),useStats)
export default  router;