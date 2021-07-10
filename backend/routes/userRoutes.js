import express from "express"
import { authUser, deleteUser, getAllUsers, getUserById, registerUser, userProfile, userUpdate, userUpdate_admin } from "../controllers/userControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const userRouter = express.Router()



userRouter.route('/').post(registerUser).get(protect,admin,getAllUsers)
userRouter.route('/login').post(authUser)
userRouter
    .route('/profile')
    .get(protect, userProfile)
    .put(protect, userUpdate)
userRouter
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, userUpdate_admin)


export default userRouter