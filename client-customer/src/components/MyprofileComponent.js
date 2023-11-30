import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { toast } from 'react-toastify';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="align-center">
        <h2 style={{fontFamily: 'cursive'}} className="text-center">MY PROFILE</h2>
        <div style={{textAlign: 'center',}}>
          <img height={'220px'} src= {require('./image/LA.png')} />
        </div>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='Username' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='Password' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='Name' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='Phone' type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='Email' type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '388px', marginTop: '20px', backgroundColor: '#1E90FF', 
                borderRadius: '10px', border: '1px', fontWeight: 'bold', fontSize: '15px', color: 'white'}} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      toast.info('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success('Update successful!');
        this.context.setCustomer(result);
      } else {
        toast.error('Update Failed!');
      }
    });
  }
}
export default Myprofile;