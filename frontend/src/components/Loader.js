import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export default class Loader extends Component {
    render() {
        return (
            <Spinner
                animation='border'
                role='status'
                style={{
                    width: '80px',
                    height: '80px',
                    margin: 'auto',
                    display: 'block',
                    top: '0',
                    translateX:'50%'
            }}> 
                <span className='sr-only'>Loading..</span>
            </Spinner>
        )
    }
}
