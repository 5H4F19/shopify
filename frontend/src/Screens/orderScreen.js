import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col,Card, Form, FormCheck,FormGroup, FormLabel, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliverOrder, getOrderDetails, payOrder  } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    
    const [sdkReady, setsdkReady] = useState(false)
    const dispatch = useDispatch()

  
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay
    
    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver
    
    if (order) {
        const addDecimal = (num) => { return (Math.round(num * 100) / 100).toFixed(2) }
         order.itemPrice =addDecimal(order.orderItems.reduce((acu, item) => acu + item.price * item.qty, 0))      
    }

    useEffect(() => {
        const addPaypalScripts = async () => {
            const {data:clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setsdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else {
            if (order._id !== orderId){
                dispatch(getOrderDetails(orderId))
            }
            if (!window.paypal) {
                addPaypalScripts()
            } else {
                setsdkReady(true)
            }
        }
    }, [dispatch,orderId,successPay,order,successDeliver])
    

    const _successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))
    }
    const _deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    
    
    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
        <>
            <Row className='shadow p-3'>
                <h1>Order #{ order._id}</h1>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>Shipping To</h3>
                            <div>
                            <strong>Name:</strong>{order.user.name}{' '}
                            </div>
                            <div>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </div>
                            <div>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city}          
                                {order.shippingAddress.postalcode},{' '}
                                {order.shippingAddress.country}
                            </div>
                             {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt.substring(0,10)}</Message> :
                            <Message variant='warning'>Not Delivered</Message>}
                       </ListGroupItem>
                        <ListGroupItem>
                            <h3>Payment Method</h3>
                            <div>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                               
                            </div>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message> :
                            <Message variant='warning'>Not paid</Message>}
                       </ListGroupItem>
                        <ListGroupItem>
                            <h3>Order Items</h3>
                            <div>
                                {order.orderItems.length === 0 ? (<Message>Your order is empty</Message>) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
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
                               
                            </div>
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
                                    <Col>${order.itemPrice }</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${ order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${ order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                        </ListGroupItem>
                        {!order.isPaid && (
                            <ListGroupItem>
                                {loadingPay && <Loader />}
                                {loadingDeliver && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={_successPaymentHandler}/>
                                )}
                            </ListGroupItem>
                        )}
                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroupItem>
                                <Button type='button' variant='success' className='rounded' onClick={_deliverHandler}>
                                      Mark as delivered
                                </Button>
                            </ListGroupItem>
                        )}
                       </ListGroup>
                   
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen


