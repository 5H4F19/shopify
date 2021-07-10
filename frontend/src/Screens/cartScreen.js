import React, { Component } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartAction'

class cartScreen extends Component {
    productId = this.props.match.params.id
    history = this.props.history
    qty = this.props.location.search ? Number(this.props.location.search.split('=')[1]) : 1
    
    componentDidMount() {
        this.props.addToCart(this.productId, this.qty)
    }   
    _removeFromCart = (id)=> {
        this.props.removeFromcart(id)
        
    }
    _checkoutHandler = () => {
       this.props.history.push('/login?redirect=shipping')
    }
    render() {
        const cart = this.props.cart.cartItems
        return (
            <div>
                <Row>
                    <Col md={8}>
                        <h1>Shopping Cart</h1>
                        {cart.length === 0 ? <p className="bg-yellow-200 leading-10 pl-3 text-gray-500">Your cart is empty <Link to='/'> <span className='font-bold ml-3 hover:bg-gray-200 px-3 py-2 rounded transition duration-300 ease-in-out'>Go Back</span></Link></p> : (
                            <ListGroup variant='flush' className='bg-gray-200'>
                                {cart.map(item => (
                                    <ListGroupItem key={item.product} className='bg-gray-200'>
                                        <Row>
                                            <Col md={2}>
                                               <Image src={`${process.env.PUBLIC_URL}/assets${item.image}`} alt={item.name} fluid />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                 <Form.Control as='select' value={item.qty} onChange={(e)=>this.props.addToCart(item.product, Number(e.target.value))}>
                                                            {[...Array(item.countInStock).keys()].map((x) => <option key={x+1}>{x + 1}</option>)}
                                                        </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={()=>this._removeFromCart(item.product)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                         </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup varaint='flush'>
                                <ListGroupItem>
                                <h5 className=''>Subtotal ({cart.reduce((acu, item) => acu + item.qty, 0)}) items</h5>
                                </ListGroupItem>
                                <ListGroupItem>
                                <h6>Subtotal $ ({cart.reduce((acu, item) => acu + item.qty * item.price, 0).toFixed(2)}) </h6>
                                </ListGroupItem>
                                <ListGroupItem>
                                     {cart.length > 0 ? (
                                        <p onClick={this._checkoutHandler} className='font-bold bg-yellow-700 text-center py-3 hover:bg-gray-400 text-white transition duration-300 ease-in-out'>Checkout</p>
                                  
                                    ) : (
                                            <p className='font-bold py-3 text-center bg-gray-400 text-white line-through'>Checkout</p>
                                        
                                        )}
                                </ListGroupItem>
                            </ListGroup>

                        </Card>
                    </Col>
              </Row>
            </div>
        )
    }
}


const mapState = (state)=>{
    return {
        cart:state.cart
    }
}

const dispatchState = (dispatch)=>{
    return {
        addToCart:(id,qty)=>{dispatch(addToCart(id,qty))},
        removeFromcart:(id)=>{dispatch(removeFromCart(id))}
    }
}
export default connect(mapState,dispatchState)(cartScreen)
