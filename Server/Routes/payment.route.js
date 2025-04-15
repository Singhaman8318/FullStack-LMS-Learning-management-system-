import { Router } from "express";
import { AllPayments, buySubscription, cancelSubscription, getRazorpayAPIKey, verifySubscription } from "../Controllers/payment.controller.js";
import {isLoggedIn} from '../Middleware/jwtAuth.midlleware.js'
const router= Router();

        router.route('/razorpay-key')
        .get(
                isLoggedIn,
        getRazorpayAPIKey);


        router.route('/subscribe')
        .post(
                isLoggedIn,
        buySubscription);


        router.route('/verify')
        .post(
                isLoggedIn,
        verifySubscription);


        router.route('/unsubscribe')
        .post(
                isLoggedIn,
        cancelSubscription);


        // for admin  

        router.route('/')
        .get(
                isLoggedIn,
        AllPayments)


export default router;