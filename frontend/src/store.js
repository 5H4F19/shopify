import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer, productListReducer, productTopRatedReducer, productUpdateReducer } from './reducers/productReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userReducer, userRegReducer, userUpdateByAdminReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListByAdminReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'
 

const reducer = combineReducers({
    cart: cartReducer,

    userLogin: userReducer,
    userReg: userRegReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
    userUpdateByAdmin:userUpdateByAdminReducer,
    
    orderPay:orderPayReducer,
    orderMyList: orderListReducer,
    orderList: orderListByAdminReducer,
    orderDeliver:orderDeliverReducer,
    orderCreate:orderCreateReducer,
    orderDetails: orderDetailsReducer,  
    
    productList: productListReducer,
    productCreate: productCreateReducer,
    productUpdate:productUpdateReducer,
    productDelete: productDeleteReducer,
    productDetails: productDetailsReducer,
    productReviewCreate:productCreateReviewReducer,
    productTopRated:productTopRatedReducer,
})


const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
const shippingArressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')):null


const initialState = {
    userLogin:{userInfo:userInfoFromStorage},
    cart: { cartItems: cartItemsFromStorage ,shippingAddress:shippingArressFromStorage},
}
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(thunk)))  

export default store