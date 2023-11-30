import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div style={{border: '1px solid black', marginTop: '10px', paddingLeft: '5px', paddingRight: '5px',
      borderRadius: '10px'}} className="border-bottom">
        <div className="float-left">
        <ul className="menu">
          <li className="menu"><Link to='/admin/home'><b>Home</b></Link></li>
          <li className="menu"><Link to='/admin/category'><b>Category</b></Link></li>
          <li className="menu"><Link to='/admin/product'><b>Product</b></Link></li>
          <li className="menu"><Link to='/admin/order'><b>Order</b></Link></li>
          <li className="menu"><Link to='/admin/customer'><b>Customer</b></Link></li>
        </ul>
      </div>
        <div className="float-right">
          HELLO: <b>{this.context.username}</b> 
          {/* <a href="" onClick={() => this.lnkLogoutClick()}>Logout</a> */}
          <Link style={{marginLeft: '10px'}} to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;