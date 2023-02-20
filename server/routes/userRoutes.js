import express from 'express'
import { isAuthenticated } from '../middleware/authenticationMiddleware.js'
import { uploadSingle } from '../middleware/multerMiddleware.js'
import {
    registerUser,
    loginUser,
    logoutUser,
    getMyProfile,
    updatePassword,
    updateProfile,
    forgetPassword,
    resetPassword,
    subscribe,
    unsubscribe,
    updateAvatar,
    getUserProfile,
} from '../controllers/userControllers.js'

const router = express.Router()

// general user routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/user/:id').get(getUserProfile)

// logged in user routes
router.route('/logout').get(isAuthenticated, logoutUser)
router.route('/profile/me').get(isAuthenticated, getMyProfile)
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/profile/avatar/update').put(isAuthenticated, updateAvatar)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/subscribe').put(isAuthenticated, subscribe)
router.route('/unsubscribe').put(isAuthenticated, unsubscribe)


export default router;