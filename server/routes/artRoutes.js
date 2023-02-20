import express from "express"
import { isAuthenticated, isCreator } from "../middleware/authenticationMiddleware.js";
import { uploadMultiple } from "../middleware/multerMiddleware.js";
import { 
    createReview,
    deleteArt,
    deleteReview,
    readArts, 
    readArt,
    updateArt,
    createArt,
    getMyArtworks,
    getRecommendations,
    addToLikes,
    removeFromLikes,
    getReviews,
} from "../controllers/artControllers.js";

const router = express.Router();
const creatorRoles = ["painter", "drawer", "sculptor", "photographer"]

// general routes
router.route('/arts').get(readArts)
router.route('/art/:id').get(readArt)
router.route('/arts/recommendations').get(getRecommendations)
router.route('/art/review/:id').get(getReviews)

// registered users route
router.route('/likes/add').post(isAuthenticated, addToLikes)
router.route('/likes/remove').delete(isAuthenticated, removeFromLikes)
router.route('/art/review/').put(isAuthenticated, createReview)
router.route('/arts/review/delete/:id').delete(isAuthenticated, deleteReview)

// creator routes
router.route('/art/upload').post(isAuthenticated, isCreator(creatorRoles), uploadMultiple.array('artImages', 6), createArt)
router.route('/art/delete/:id').delete(isAuthenticated, isCreator(creatorRoles), deleteArt)
router.route('/art/update/:id').put(isAuthenticated, isCreator(creatorRoles), updateArt)
router.route('/artworks/me').get(isAuthenticated, isCreator(creatorRoles), getMyArtworks)


// admin route


export default router;