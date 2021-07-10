import React, { useEffect, useState } from 'react'
import { Button, Col,Card, Form, FormCheck,FormGroup, FormLabel, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { creatOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/checkoutSteps'
import Message from '../components/Message'

const PlaceorderScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    
    const addDecimal = (num)=>{ return (Math.round(num*100)/100).toFixed(2)}


//  @ Calculate prices
    cart.itemPrice =addDecimal(cart.cartItems.reduce((acu, item) => acu + item.price * item.qty, 0))
    cart.shippingPrice =  addDecimal(Number(0.05 * cart.itemPrice))
    cart.taxPrice = addDecimal(Number(0.005 * cart.itemPrice))
    cart.totalPrice = Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
    

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    
    useEffect(() => {
        if (success) {
           history.push(`/order/${order._id}`)
       }
    }, [history, success,order])
    

    const placeOrderHandler = () => {
         
        dispatch(creatOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice:cart.totalPrice
        }))
    }
    
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row  className='shadow p-3'>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>Shipping TO</h3>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}          
                                {cart.shippingAddress.postalcode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                       </ListGroupItem>
                        <ListGroupItem>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                               
                            </p>
                       </ListGroupItem>
                        <ListGroupItem>
                            <h3>Order Items</h3>
                            <p>
                                {cart.cartItems.length === 0 ? (<Message>Your cart is empty</Message>) : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroupItem key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                       <Image src={`${process.env.PUBLIC_URL}/assets${item.image}`} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{ item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty*item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                  </ListGroup>
                               )}
                               
                            </p>
                       </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3} className='shadow-sm md:ml-10'>
                  
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h4>Order Summery</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemPrice }</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${ cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${ cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroupItem>
                            <ListGroupItem>
                                <Button type='button' onClick={placeOrderHandler} className='btn-block' disabled={cart.cartItems.length === 0}>Place Order</Button>
                            </ListGroupItem>
                       </ListGroup>
                   
                </Col>
            </Row>
        </div>
    )
}

export default PlaceorderScreen
