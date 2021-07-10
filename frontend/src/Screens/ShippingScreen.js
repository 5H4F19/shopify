import React, { Component } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/checkoutSteps'
import FormContainer from '../components/FormContainer'

class ShippingScreen extends Component {
    state={
        address: '',
        city: '',
        postalCode: '',
        country:'',
    }

    componentDidMount() {
        if (this.props.shipping) {
            
            const {address,city,postalCode,country} = this.props.shipping
            this.setState({
                address,
                city,
                postalCode,
                country
            })
        }
    }

    _submitHandler = (e) => {
        const address = this.state.address
        const city = this.state.city
        const postalCode = this.state.postalCode
        const country = this.state.country
        e.preventDefault()
        this.props.setAddessToLocal({ address, city, postalCode, country })
        this.props.history.push('/payment')
    }
    render() {
        return (
            <div>
                <FormContainer className='shadow'>
                    <CheckoutSteps step1 step2/>
                    <h1>Shipping</h1>
                    <Form onSubmit={this._submitHandler} className='shadow p-3'>
                        
                        <FormGroup controlId='address'>
                            <FormLabel>Address</FormLabel>
                            <FormControl required type='text' placeholder='Enter address' value={this.state.address} onChange={(e)=>this.setState({address:e.target.value})}>
                            </FormControl> 
                       </FormGroup>
                

                        <FormGroup controlId='city'>
                            <FormLabel>City</FormLabel>
                            <FormControl required type='text' placeholder='Enter city' value={this.state.city} onChange={(e)=>this.setState({city:e.target.value})}>
                            </FormControl> 
                       </FormGroup>
                

                        <FormGroup controlId='postalCode'>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl required type='text' placeholder='Enter postalCode' value={this.state.postalCode} onChange={(e)=>this.setState({postalCode:e.target.value})}>
                            </FormControl> 
                       </FormGroup>
                

                        <FormGroup controlId='country'>
                            <FormLabel>Country</FormLabel>
                            <FormControl required type='text' placeholder='Enter country' value={this.state.country} onChange={(e)=>this.setState({country:e.target.value})}>
                            </FormControl> 
                        </FormGroup>
                        
                        <Button type='submit' variant='primary'>
                            Continue
                       </Button>
                    </Form>
                </FormContainer>
            </div>
        )
    }
}


const mapState = (state)=>{
    return {
        shipping:state.cart.shippingAddress
    }
}

const dispatchState = (dispatch,state)=>{
    return {
        setAddessToLocal:(data)=>{dispatch(saveShippingAddress(data))}
    }
}

export default connect(mapState,dispatchState)(ShippingScreen)