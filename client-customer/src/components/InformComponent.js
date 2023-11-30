import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div style={{marginTop: '5px'}} className="border-bottom">
      <div style={{textAlign: 'center', width: 'auto'}} className="flex">
        <img style={{marginLeft: '100px'}} height={'100px'} src= {require('./image/logo.png')} />
        <div style={{marginBottom: '2px', marginRight: '2px', paddingTop: '81px'}} className="float-right">
        <Link style={{marginRight: '5px'}} to='/gmap'>🌍</Link>
        <Link to='/mycart'>🛒</Link><b>{this.context.mycart.length}</b> <b>items</b>
      </div>
      </div>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;