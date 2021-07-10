import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const OrderList = useSelector(state => state.orderList)
    const { loading, error, orders } = OrderList
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
            
        } else {
            history.push('/')
        }
      
    }, [dispatch, history,userInfo])
    

    return ( 
        <>
            <h1>Orders</h1> 
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>PRICE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                
                    </thead>
                    <tbody>
                        {orders.map(Order => (
                            <tr key={Order._id}>
                                <td className='text-center'>{ Order._id}</td>
                                <td className='text-center'>{ Order.user.name}</td>
                                <td className='text-center'>{Order.createdAt.substring(0,10) }</td>
                                <td className='text-center'>{Order.totalPrice}</td>
                                <td className='text-center'>
                                    {Order.isPaid ? (
                                        Order.paidAt.substring(0,10)
                                    ) : (
                                        <i className='fas fa-times text-red-500'></i>
                                        )}
                                </td>
                                 <td className='text-center'>
                                    {Order.isDelivered ? (
                                        Order.deliveredAt.substring(0,10)
                                        ) : (
                                            <i className='fas fa-times text-red-500 text-center'></i>
                                            )}
                                </td>
                                <td className='text-center'>
                                     <Link to={`/order/${Order._id}`}>
                                        <Button variant='light' className='btn-sm rounded shadow px-2 mx-1 text-center'>
                                            <i className='fas fa-edit text-center'></i>
                                        </Button>
                                    </Link>
                                </td>        
                             
                               
                              
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
