import React, { Component } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel,Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {  register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

class RegisterScreen extends Component {
    state = {
        name:'',
        email: '',
        password: '',
        confirmPass: '',
        message:'',
        redirect:this.props.location.search ? this.props.location.search.split('=')[1] : '/'
    }

    componentDidMount() {
        if (this.props.userInfo.userInfo) {
            this.props.history.push(this.state.redirect)
        }
    }
    _submitHandler = (e) => {
        e.preventDefault()
        if (this.state.password !== this.state.confirmPass) {
            this.setState({message:'Password does not match'})
        } else {
            this.props.submitReg(this.state.name, this.state.email, this.state.password)
            if (this.props.userInfo.userInfo && this.props.userInfo.userInfo.success) {
                this.props.history.push(this.state.redirect)               
            }
        }
        
    }
    render() {
      
        const {loading, error, userInfo} = this.props.userInfo
        
        return (
            <FormContainer>
                {loading && <Loader/>}
                <h1>sign up </h1>
                {this.state.message && <Message variant='danger'>{this.state.message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={this._submitHandler}>
                    <FormGroup controlId='username'>
                        <FormLabel>Name</FormLabel>
                     
                        <FormControl type='text' placeholder='Enter name' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                      
                        <FormControl type='email' placeholder='Enter email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password' placeholder='Enter password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl type='password' placeholder='Enter confirm password' value={this.state.confirmPass} onChange={(e) => this.setState({ confirmPass: e.target.value })} ></FormControl>
                    </FormGroup>
                    <Button type='submit' variant='primary' disabled={!this.state.email && !this.state.password && !this.state.name && !this.state.confirmPass}>
                        REGISTER
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Already a Customer? <NavLink to={this.state.redirect?  `login?redirect=${this.state.redirect}`:'/login'}>Login now</NavLink>
                    </Col>
                </Row>
            </FormContainer>
        )
    }
}

const mapState = (state)=>{
    return {
        userInfo: state.userReg
    }
}

const dispatchState = (dispatch)=>{
    return {
        submitReg: (name,email,password) => { dispatch(register(name,email,password)) }       
    }
}

export default connect(mapState,dispatchState)(RegisterScreen)