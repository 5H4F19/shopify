import React from 'react'
import { Nav, NavItem, NavLink} from 'react-bootstrap'
import { Link} from 'react-router-dom'

 const CheckoutSteps = ({step1,step2,step3,step4}) => {
     return (
        <Nav className='justify-content-center mb-4'>
            <NavItem className='mx-2'>
            {step1 ? (
                <Link className='font-bold' to='/login'>Sign In</Link>
                ) : (
                    <NavLink  className='-mt-2' disabled>Sign In</NavLink>                
                   )}          
           </NavItem>
            <NavItem className='mx-2'>
            {step2 ? (
                <Link class='font-bold' to='/shipping'>  <span>Shipping</span></Link>
                ) : (
                    <NavLink className='-mt-2' disabled>Shipping</NavLink>                
                   )}          
           </NavItem>
            <NavItem className='mx-2'>
            {step3 ? (
                <Link  class='font-bold' to='/payment'>Payment</Link>
                ) : (
                    <NavLink className='-mt-2' disabled>Payment</NavLink>                
                   )}          
           </NavItem>
            <NavItem className='mx-2'>
            {step4 ? (
                <Link  class='font-bold' to='/placeholder'>Placeholder</Link>
                ) : (
                    <NavLink className='-mt-2' disabled>Placeholder</NavLink>                
                   )}          
           </NavItem>
        </Nav>
     )
 }

 export default CheckoutSteps
