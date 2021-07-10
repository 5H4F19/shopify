import React, { useState } from 'react'
import { Button, Col, Form, FormCheck,FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/checkoutSteps'
import FormContainer from '../components/FormContainer'

const PaymentScreen = ({history }) => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const { shippingAddress } = cart
    
    if (!shippingAddress) {
        history.push('/shipping')
    }
    
    const [PaymentMethod, setPaymentMethod] = useState('Paypal')
    
    const _submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(PaymentMethod))
        history.push('/placeorder')
    }
    return (
        <div>
            <FormContainer>
                    <CheckoutSteps step1 step2 step3/>
                    <h1>Payment Method</h1>
                    <Form onSubmit={_submitHandler} className='shadow p-3'>
                        
                        <FormGroup>
                            <FormLabel as='legend'>Select Method</FormLabel>
                       </FormGroup>
                
                    <Col>
                        <FormCheck type='radio' label='Paypal or Credit Card' value='Paypal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></FormCheck>
                    </Col>
                    
                        
                        <Button type='submit' variant='primary' className='mt-4'>
                            Continue
                       </Button>
                    </Form>
                </FormContainer>
            </div> 
    )
}

export default PaymentScreen
