import express from 'express'
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js'
import { getAllUsers } from '../controllers/adminControllers.js'
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
router.route('/subscribe').post(subscribe)

// logged in user routes
router.route('/logout').get(isAuthenticated, logoutUser)
router.route('/profile/me').get(isAuthenticated, getMyProfile)
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/profile/avatar/update').put(isAuthenticated, updateAvatar)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/account/delete/:id').delete(isAuthenticated, deleteAccount)


// admin routes
router.route('/admin/users').get(isAuthenticated, isAdmin, getAllUsers)
router.route('/admin/user/delete/:id').delete(isAuthenticated, isAdmin, deleteAccount)



export default router;