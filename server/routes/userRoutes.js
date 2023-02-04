import express from 'express'
import { isAuthenticated } from '../middleware/authenticationMiddleware.js'
import {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updatePassword,
    updateProfile,
    forgetPassword,
    resetPassword,
    addToLikes,
    removeFromLikes,
    subscribe,
    unsubscribe,
} from '../controllers/userControllers.js'

const router = express.Router()

// user routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticated, logoutUser)
router.route('/profile').get(isAuthenticated, getProfile);
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/likes/add').post(isAuthenticated, addToLikes)
router.route('/likes/remove').post(isAuthenticated, removeFromLikes)
router.route('/subscribe').put(isAuthenticated, subscribe)
router.route('/unsubscribe').put(isAuthenticated, unsubscribe)


export default router;