import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <Container className='mt-12'>
                    <Row>
                        <Col className='text-center py-3'> 
                            Copyright &copy; Khanam.com
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
