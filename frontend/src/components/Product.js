import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

export default class Product extends Component {
    
  
    render() {
        const { product } = this.props
        return (
            <div className='my-3 rounded shadow-md'> 
            {  console.log(this.props.product.name)}
                <Link to={`/product/${product._id}`}>
                    <img style={{width:undefined,height:200,aspectRatio:640 / 510,margin:'auto'}} src={`${process.env.PUBLIC_URL}/assets${this.props.product.image}`} alt='bad'/>
                </Link>

                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div'>
                          
                                { product.name}
                           
                        </Card.Title>
                        
                        <Card.Text as='div'>
                            <div className="my-3">
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </div>
                        </Card.Text>

                        <Card.Text as='h5'>
                                  ${product.price }
                        </Card.Text>
                </Link>
                </Card.Body>
            </div>
        )
    }
}
