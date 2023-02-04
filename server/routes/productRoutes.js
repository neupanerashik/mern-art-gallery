import express from "express"
import { isAuthenticated, isCreator } from "../middleware/authenticationMiddleware.js";
import { 
    createReview,
    deleteProduct,
    deleteReview,
    getAllProducts, 
    readProduct,
    updateProduct,
    createProduct
} from "../controllers/productControllers.js";

const router = express.Router();
const creatorRoles = ["painter", "drawer", "sculptor", "photographer", "digital artist"]

// general routes
router.route('/products').get(getAllProducts)
router.route('/product/read/:id').get(readProduct)
router.route('/products/review/create/:id').put(isAuthenticated, createReview)
router.route('/products/review/delete/:id').delete(isAuthenticated, deleteReview)

// creator routes
router.route('/product/create').post(isAuthenticated, isCreator(creatorRoles), createProduct)
router.route('/product/delete/:id').delete(isAuthenticated, isCreator(creatorRoles), deleteProduct)
router.route('/product/update/:id').put(isAuthenticated, isCreator(creatorRoles), updateProduct)

// admin route


export default router;