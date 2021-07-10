import express from "express"
import { addOrderItems, getMyOrders,getOrders, getOrderById, updateOrderToPaid, updateOrderToDelebered } from "../controllers/orderController.js"
import { protect ,admin} from "../middleware/authMiddleware.js"
const orderRouter = express.Router()



orderRouter.route('/myorders').get(protect,getMyOrders)
orderRouter.route('/').post(protect, addOrderItems).get(protect,admin,getOrders)
orderRouter.route('/:id').get(protect, getOrderById) 
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid) 
orderRouter.route('/:id/deliver').put(protect,admin, updateOrderToDelebered) 


export default orderRouter