import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import { toast } from 'react-toastify';


class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    return (
      <div className="align-center" style={{ marginTop: '30px', height:  '270px', width: '400px'}}>
        <h2 style={{fontFamily: 'cursive'}} className="text-center">LOGIN</h2>
        <div style={{textAlign: 'center',}}>
          <img height={'220px'} src= {require('./image/LA.png')} />
        </div>
        <form>
          <table className="" style={{marginTop: '20px',}}>
          <tbody>
              <tr>
                <td></td>
                <td><input className='LoGin' style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} type="text" placeholder='Username'  value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}/></td>
              </tr>
              <tr>
                <td></td>
                <td><input className='LoGin' style={{height: '40px', width: '380px', marginTop: '20px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} 
              type="password" placeholder='Password' value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '388px', marginTop: '20px', backgroundColor: '#1E90FF', 
                borderRadius: '10px', border: '1px', fontWeight: 'bold', fontSize: '15px', color: 'white'}}  
                type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      toast.info('Please input username and password')
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
        toast.success('Login Successful')
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);