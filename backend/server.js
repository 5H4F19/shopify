import express from 'express'
import path from 'path'
import products from './data/products.js' 
import dotenv from 'dotenv'
import connectDB from './database.js'
import colors from 'colors'
import Product from './models/productModel.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'


dotenv.config()

const app = express()

app.use(express.json())


app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

app.use('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()


app.use(express.static(path.join(path.resolve(), '/frontend/build')))


app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))

app.use(errorHandler)
connectDB()

app.listen(process.env.PORT || 5000,console.log('Server Running 5000'.cyan))