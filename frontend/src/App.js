import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from './Screens/ProductScreen'
import cartScreen from './Screens/cartScreen'
import loginScreen from './Screens/loginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import placeorderScreen from './Screens/placeorderScreen'
import OrderScreen from './Screens/orderScreen'
import UserListScreen from './Screens/userListScreen'
import ProductListScreen from './Screens/productListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import OrderListScreen from './Screens/OrderListScreen'


function App() {


  return (
    <Router>
      <header className='sticky'>
      <Header />
      </header>

      <main className='mt-3'>
        <Container>
          <Route path='/' exact component={ HomeScreen}/>
          <Route path='/search/:keyword' component={ HomeScreen} exact />
          <Route path='/page/:pageNumber' component={ HomeScreen}/>
          <Route path='/search/:keyword/page/:pageNumber' component={ HomeScreen}/>
          <Route path='/product/:id'  component={ ProductScreen}/>       
          <Route path='/cart/:id?' component={cartScreen} />   
          <Route path='/login' component={ loginScreen}/>
          <Route path='/register' component={ RegisterScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/placeorder' component={placeorderScreen}/>
          <Route path='/admin/productlist' component={ProductListScreen } exact/>
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen } exact/>
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
           <Route path='/admin/user/:id/edit' component={UserEditScreen} />
           <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/order/:id' component={OrderScreen}/>
          
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
