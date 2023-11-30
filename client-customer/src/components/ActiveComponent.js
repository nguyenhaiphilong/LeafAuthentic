import axios from 'axios';
import withRouter from '../utils/withRouter';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="align-center">
        <h2 style={{fontFamily: 'cursive'}} className="text-center">ACTIVE ACCOUNT</h2>
        <div style={{textAlign: 'center',}}>
          <img height={'220px'} src= {require('./image/LA.png')} />
        </div>
        <form>
          <table className="align-center">
            <tbody>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='ID' type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '380px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} placeholder='Token' type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input style={{height: '40px', width: '388px', marginTop: '20px', backgroundColor: '#1E90FF', 
                borderRadius: '10px', border: '1px', fontWeight: 'bold', fontSize: '15px', color: 'white'}} 
                type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      toast.info('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        if(result.success==false)
        toast.error("ID or token is incorrect")
        else{
          toast.success("ACTIVE Thành Công")
          this.props.navigate('/login');
        }
      } else {
        toast.error("ID or token is incorrect")
      }
    });
  }
}
export default withRouter(Active);