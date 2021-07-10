import expressAsyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import mongoose from 'mongoose'

export const addOrderItems = expressAsyncHandler(async (req, res) => {
    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error ('No order items')
    } else {
        const order =await Order.create({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        })
        res.status(201).json(order)
    }
})

// @desc    Get order by ID
// @route   GET  /api/orders/:id
// @access  Private

export const getOrderById = expressAsyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user','name email')
   
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})

// @desc    Update order to paid
// @route   GET  /api/orders/:id/pay
// @access  Private

export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)
   
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address,
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('order not found')
    }
})

// @desc   get logged in users profile
// @route   GET  /api/orders/myorders
// @access  Private

export const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc   get All the orders
// @route   GET  /api/orders
// @access  Private/admin

export const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user','id name')
  res.json(orders)
})

// @desc    Update delebered
// @route   GET  /api/orders/:id/deliver
// @access  Private/admin

export const updateOrderToDelebered = expressAsyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id)
   
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        const updatedOrder = await order.save()
        console.log(order)
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('order not found')
    }
})
