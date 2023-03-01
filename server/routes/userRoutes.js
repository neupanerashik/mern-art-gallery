import express from 'express'
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js'
import { getUsers } from '../controllers/adminControllers.js'
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
    sendMailFromContact,
    deleteAccount,
} from '../controllers/userControllers.js'


const router = express.Router()

// general user routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/user/:id').get(getUserProfile)
router.route('/send/email').post(sendMailFromContact)

// logged in user routes
router.route('/logout').get(isAuthenticated, logoutUser)
router.route('/profile/me').get(isAuthenticated, getMyProfile)
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/profile/avatar/update').put(isAuthenticated, updateAvatar)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/account/delete/:id').delete(isAuthenticated, deleteAccount);
router.route('/subscribe').put(isAuthenticated, subscribe)
router.route('/unsubscribe').put(isAuthenticated, unsubscribe)


// admin routes
router.route('/admin/users').get(isAuthenticated, isAdmin, getUsers)
router.route('/admin/user/delete/:id').delete(isAuthenticated, isAdmin, deleteAccount)



export default router;