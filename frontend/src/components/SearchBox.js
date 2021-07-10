import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setkeyword] = useState()
    

    const _submitHandler = (e) => {
        e.preventDefault()

        if (keyword && keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onClick={_submitHandler} inline>
            <Form.Control className='rounded' type='text' name='q' value={keyword} onChange={ (e)=>setkeyword(e.target.value)} placeholder='Search product..'>
            </Form.Control>
            <Button type='submit' className='rounded py-2 px-2 ml-1' variant='outline-success'><i className='fas fa-search'></i></Button>
        </Form>
    )
}

export default SearchBox
