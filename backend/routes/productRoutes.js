import express from "express"
import {protect, admin} from '../middleware/authMiddleware.js'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, topRatedProducts, updateProduct } from "../controllers/productControllers.js"
const productRouter = express.Router()


productRouter.get('/top', topRatedProducts)

productRouter.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
    
productRouter.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect,admin,updateProduct)
productRouter.route('/:id/review')
    .post(protect,createProductReview)


export default productRouter