import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div style={{marginRight: '20%'}} className="float-right">
        <h2 style={{fontFamily: 'cursive'}} className="text-center">CATEGORY DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td><b>ID:</b></td>
                <td><input style={{height: '25px', width: '200px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td><b>Name:</b></td>
                <td><input style={{height: '25px', width: '190px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px', marginLeft: '10px'}} type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td style={{paddingTop: '15px'}}>
                <input style={{height: '20px', width: '90px', backgroundColor: '#1E90FF', 
                borderRadius: '4px', border: '2px solid gray', fontWeight: 'bold', fontSize: '10px', color: 'white'}} type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                </td>
                <td style={{paddingTop: '15px'}}>   
                  <input style={{height: '20px', width: '90px',backgroundColor: '#1E90FF', marginLeft: '15px', marginRight: '3px', 
                borderRadius: '4px', border: '2px solid gray', fontWeight: 'bold', fontSize: '10px', color: 'white'}} 
                type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />   
                  <input style={{height: '20px', width: '90px', backgroundColor: '#1E90FF', marginLeft: '15px', 
                borderRadius: '4px', border: '2px solid gray', fontWeight: 'bold', fontSize: '10px', color: 'white'}} type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('ARE YOU SURE YOU WANT TO ADD?');
        this.apiGetCategories();
      } else {
        alert('SORRY ADD UNSUCCESS!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('ARE YOU SURE YOU WANT TO UPDATE?');
        this.apiGetCategories();
      } else {
        alert('SORRY UPDATE UNSUCCESS!');
      }
    });
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE YOU WANT TO DELETE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('PLEASE CONFIRM AGAIN.');
        this.apiGetCategories();
      } else {
        alert('SORRY DELETE UNSUCCESS!');
      }
    });
  }
}
export default CategoryDetail;