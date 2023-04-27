import express from "express"
import { isAuthenticated, isCreator } from "../middleware/authMiddleware.js";
import { uploadMultiple } from "../middleware/multerMiddleware.js";
import { 
    createReview,
    deleteArt,
    deleteReview,
    readArts, 
    readArt,
    updateArt,
    createArt,
    getUserArtworks,
    getRecommendations,
    addToLikes,
    removeFromLikes,
    getReviews,
    placeBid,
    findHighestBidder
} from "../controllers/artControllers.js";

const router = express.Router();

// general routes
router.route('/arts').get(readArts)
router.route('/art/:id').get(readArt)
router.route('/arts/recommendations').get(getRecommendations)
router.route('/art/:id/reviews').get(getReviews)
router.route('/artworks/:id').get(getUserArtworks)
router.route('/auction/highest-bidder').get(findHighestBidder);

// registered users route
router.route('/likes/add').post(isAuthenticated, addToLikes)
router.route('/likes/remove').delete(isAuthenticated, removeFromLikes)
router.route('/art/review/').put(isAuthenticated, createReview)
router.route('/arts/review/delete/:id').delete(isAuthenticated, deleteReview)
router.route('/auction/bid').post(isAuthenticated, placeBid)

// creator routes
router.route('/art/upload').post(isAuthenticated, isCreator, uploadMultiple.array('artImages', 6), createArt)
router.route('/art/delete/:id').delete(isAuthenticated, isCreator, deleteArt)
router.route('/art/update/:id').put(isAuthenticated, isCreator, updateArt)


export default router;