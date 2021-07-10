import React, { Component } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel,Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

class loginScreen extends Component {
    state = {
        email: '',
        password:'',
        redirect:this.props.location.search ? this.props.location.search.split('=')[1] :'/'
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.userInfo.userInfo) {
            this.props.history.push(this.state.redirect)
        }
    }
    _submitHandler = (e) => {
        e.preventDefault()
        this.props.submitLog(this.state.email, this.state.password)
        if (this.props.userInfo.userInfo && this.props.userInfo.userInfo.success) {
                this.props.history.push(this.state.redirect)               
            }
    }
    render() {
      
        const {loading, error, userInfo} = this.props.userInfo
        
        return (
            <FormContainer className='shadow'>
                {loading && <Loader/>}
                <h1>sign IN </h1>
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={this._submitHandler}>
                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                      
                        <FormControl type='email' placeholder='Enter email' value={this.email} onChange={(e) => this.setState({ email: e.target.value })} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                     
                        <FormControl type='password' placeholder='Enter password' value={this.password} onChange={(e) => this.setState({ password: e.target.value })} ></FormControl>
                    </FormGroup>
                    <Button type='submit' variant='primary' disabled={!this.state.email && !this.state.password}>
                        Sign in
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Customer? <NavLink to={this.state.redirect?  `register?redirect=${this.state.redirect}`:'/register'}>Register</NavLink>
                    </Col>
                </Row>
            </FormContainer>
        )
    }
}

const mapState = (state)=>{
    return {
        userInfo: state.userLogin
    }
}

const dispatchState = (dispatch)=>{
    return {
        submitLog: (email,password) => { dispatch(login(email,password)) }       
    }
}

export default connect(mapState,dispatchState)(loginScreen)