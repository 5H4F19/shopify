import React, { useEffect}from 'react'
import { Link } from 'react-router-dom'
import { Carousel,  CarouselItem,  Image } from 'react-bootstrap'
import {listTopProducts} from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    
    const productTopRated = useSelector(state => state.productTopRated)
    
    const { loading, error, products } = productTopRated
    
    useEffect(() => {
        dispatch(listTopProducts())
        
    }, [dispatch])
    
    return loading ? <Loader /> : error ? <Message varaint='danger'>{error}</Message> : (
        <Carousel pause='hover'>
            {products.map(product => (
                <CarouselItem  key={product._id}  style={{backgroundImage:`url(${process.env.PUBLIC_URL}/assets/images/bg_greate.jpg)`,backgroundSize:'cover'}} >
                    <Link to={`/product/${product._id}`}>
                 
                    <Image className='img shadow align-middle' src={`${process.env.PUBLIC_URL}/assets${product.image}`} fluid/>
                     </Link>
                    </CarouselItem>
                ))}
        </Carousel>
    )
}

export default ProductCarousel
