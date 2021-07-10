import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default class FormContainer extends Component {
    render() {
        return (
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
    }
}
