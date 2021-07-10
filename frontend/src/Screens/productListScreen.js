import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { productsDelete, listProducts,productCreateByAdmin } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({history,match}) => {
    const dispatch = useDispatch()
    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const { loading:listLoading, error:listError, products ,page,pages} = productList
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { success:deleteSuccess,loading:deleteLoading ,error:deleteError} = productDelete
    
    const productCreate = useSelector(state => state.productCreate)
    const {loading:createLoading,error:createError,success:successCreate,product:createdProduct} = productCreate
   
    useEffect(() => {
        
        dispatch({ type: PRODUCT_CREATE_RESET })
           if (!userInfo || !userInfo.isAdmin) {
               history.push('/login')
            }

            if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
            } else {
            dispatch(listProducts('',pageNumber))
        }
        if (deleteSuccess) {
            dispatch(listProducts('',pageNumber))
            
        }
      
    }, [dispatch, history,pageNumber, userInfo,createdProduct,successCreate,deleteSuccess])
    
    const deleteHandler = (id) => {
          dispatch(productsDelete(id))
    }
    const createProductHandler = () => {
        dispatch(productCreateByAdmin())
    }

    return ( 
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right p-2 md:mr-12'> 
                    <i  onClick={createProductHandler} className='fas fa-plus bg-green-500 p-3 rounded-circle text-white shadow active:bg-green-300 transition duration-200 cursor-pointer'></i>
                </Col>
            </Row>
            {deleteLoading && <Loader />}
            {deleteError && <Message variant='danger'>{ deleteError}</Message>}
            {createLoading && <Loader />}
            {createError && <Message variant='danger'>{ createError}</Message>}
            {listLoading?
                <Loader />
                : listError ?
                    <Message variant='danger'>{listError}</Message>
                    : (
                        <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{ product._id}</td>
                                <td>{ product.name}</td>
                                <td>${ product.price}</td>
                                <td>{ product.category}</td>
                                <td>{ product.brand}</td>
                               
                                <td>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm rounded shadow px-2 mx-1'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>
    
                                        <Button variant='danger' onClick={()=>deleteHandler(product._id)} className='btn-sm rounded shadow px-2'>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                            
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                            <Paginate page={page} pages={pages} isAdmin={true} /> 
                    </>
            )}
        </>
    )
}

export default ProductListScreen
