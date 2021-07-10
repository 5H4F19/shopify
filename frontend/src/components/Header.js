import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = ({history}) => {
    const dispatch = useDispatch()
    const hist = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
      dispatch(logout())
      hist.push('/')
  }

  return (
    <header className='bg-green-50'>
      <Navbar className='shadow' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand className='lowercase capitalize'>Κατάστημα<span className='text-red-600 bg-red-600 rounded ml-1'>.</span></Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
                <Nav.Link>
              <Link to='/cart' className='text-gray-700 transition duration-300 hover:text-white hover:bg-green-400 p-2 rounded'>
                  <i className='fas fa-shopping-cart'></i> Cart
              </Link>
                </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' className='text-gray-700 transition duration-300 hover:text-white hover:bg-green-400 rounded'>
                    <NavDropdown.Item>
                    <Link to='/profile'>
                     Profile              
                    </Link>
                    </NavDropdown.Item>
                   <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                  <Nav.Link>
                <Link to='/login' className='text-gray-700 transition duration-300 hover:text-white hover:bg-green-400 p-2 rounded'>
                    <i className='fas fa-user'></i> Sign In
                </Link>
                  </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className='text-gray-700 transition hover:text-white duration-300 hover:bg-green-400 rounded'>
                    <NavDropdown.Item>
                       <Link to='/admin/userlist'>
                         Users
                       </Link>
                    </NavDropdown.Item>
                     <NavDropdown.Item>
                  <Link to='/admin/productlist'>
                    Products
                  </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                  <Link to='/admin/orderlist'>
                    Orders
                  </Link>
                    </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
