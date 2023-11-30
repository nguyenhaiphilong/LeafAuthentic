import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../../../client-customer/src/contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import { toast } from 'react-toastify';

export class Address extends Component {
  static contextType = MyContext; // using this.context to access global state
  // địa chỉ nhận hàng
  constructor(props) {
    super(props);
    this.state = {
      Sonha: '',
      Phuong: '',
      Quan: '',
      Thanhpho: '',
    };
  }
  render() {
    return (
      <div className="align-center">
        <h2 style={{ fontFamily: 'cursive' }} className="text-center">DELIVERY ADDRESS</h2>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td></td>
                <td><input style={{
                  height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
                  borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'
                }} placeholder='House number & Street' type="text" value={this.state.Sonha} onChange={(e) => { this.setState({ Sonha: e.target.value }); }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{
                  height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
                  borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'
                }} placeholder='Wards' type="text" value={this.state.Phuong} onChange={(e) => { this.setState({ Phuong: e.target.value }); }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{
                  height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
                  borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'
                }} placeholder='District' type="text" value={this.state.Quan} onChange={(e) => { this.setState({ Quan: e.target.value }); }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{
                  height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
                  borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'
                }} placeholder='City' type="text" value={this.state.Thanhpho} onChange={(e) => { this.setState({ Thanhpho: e.target.value }); }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{
                  height: '40px', width: '388px', marginTop: '20px', backgroundColor: '#1E90FF',
                  borderRadius: '10px', border: '1px', fontWeight: 'bold', fontSize: '15px', color: 'white'
                }} type="submit" value="Order" onClick={(e) => this.lnkCheckoutClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }






  lnkCheckoutClick(e) {
    e.preventDefault();
   if(this.context.customer !==null){
    const customer = this.context.customer;
    const sonha = this.state.Sonha;
    const phuong = this.state.Phuong;
    const quan = this.state.Quan;
    const thanhpho = this.state.Thanhpho;
    if (sonha && phuong && quan && thanhpho) {
      const addressnew = {
        sonha: sonha,
        phuong: phuong,
        quan: quan,
        thanhpho: thanhpho
      };
      const customer_addressnew = {
        _id: customer._id,
        username: customer.username,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: addressnew,
      };

      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;

        if (customer) {
          this.apiCheckout(total, items, customer_addressnew);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
    else {
      alert("Please enter your address");
    }


   }else{
    toast.error("Please login to your account");
    toast.error("⚠️ If you don't have an account yet, please register");
    this.props.navigate('/login');
   }
  }

  apiCheckout(total, items, customer_addressnew) {
    const body = { total: total, items: items, customer: customer_addressnew };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success('Thank you for your order');
        this.context.setMycart([]);
        this.props.navigate('/myorders');
      } else {
        toast.error('Order failed');
      }
    });
  }

}
