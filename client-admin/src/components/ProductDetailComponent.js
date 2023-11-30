import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './css/Style.css'

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
      imagesChitiet: [],
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="float-right">
        <h2 className="text-center">PRODUCT DETAIL</h2>
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
                <td><input style={{height: '25px', width: '200px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td><b>Price:</b></td>
                <td><input style={{height: '25px', width: '200px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px'}} type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td><b>Image:</b></td>
                <td><input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} /></td>
              </tr>
              <tr>
                <td><b>Detailed Images:</b></td>
                <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImageChitiet(e)} multiple />
              </tr>
              <tr>
                <td><b>Category:</b></td>
                <td><select style={{height: '25px', width: '210px', borderBottom: '1px solid black', borderTop: '0px',
              borderLeft: '0px', borderRight: '0px', paddingLeft: '10px',}} onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select></td>
              </tr>
              <tr>
                <td><input style={{height: '20px', width: '90px', backgroundColor: '#1E90FF', 
                borderRadius: '4px', border: '2px solid gray', fontWeight: 'bold', fontSize: '10px', color: 'white'}} type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} /></td>
                <td>
                
                <input style={{height: '20px', width: '90px',backgroundColor: '#1E90FF', marginLeft: '15px', marginRight: '3px', 
                borderRadius: '4px', border: '2px solid gray', fontWeight: 'bold', fontSize: '10px', color: 'white'}} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                <input style={{height: '20px', width: '90px', backgroundColor: '#1E90FF', marginLeft: '15px', 
                borderRadius: '4px', border: '2px solid gray', fontWeight: 'bold', fontSize: '10px', color: 'white'}} type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2"><img src={this.state.imgProduct} width="300px" height="300px" alt="" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    const imageChitiet = this.state.imagesChitiet.map((img) => img.replace(/^data:image\/[a-z]+;base64,/, ''));
    if (name && price && category && image && imageChitiet) {
      const prod = { name: name, price: price, category: category, image: image ,imageChitiet: imageChitiet};
      this.apiPostProduct(prod);
    } else {
      alert('Please input name and price and category and image');
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    const imageChitiet = this.state.imagesChitiet.map((img) => img.replace(/^data:image\/[a-z]+;base64,/, ''));
    if (id && name && price && category && image && imageChitiet) {
      const prod = { name: name, price: price, category: category, image: image ,imageChitiet:imageChitiet};
      this.apiPutProduct(id, prod);
    } else {
      alert('Please input id and name and price and category and image');
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE YOU WANT TO DELETE PRODUCTS?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  previewImageChitiet(e) {
    const files = e.target.files;
    const newImages = [];
  
    // Check if files exist
    if (files.length > 0) {
      // Use Promise.all to handle asynchronous file reading
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
  
          reader.onload = (evt) => {
            // Push each data URL to the newImages array
            newImages.push(evt.target.result);
            resolve();
          };
  
          // Read the current file
          reader.readAsDataURL(file);
        });
      });
  
      // After all files are read, update the state
      Promise.all(promises).then(() => {
        this.setState({ imagesChitiet: newImages }, () => {
       
        });
      });

    }
  }
  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('ARE YOU SURE YOU WANT TO ADD PRODUCTS?');
        this.apiGetProducts();
      } else {
        alert('ADD UNSUCCESSFUL PRODUCTS.');
      }
    });
  }
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('PLEASE CONFIRM AGAIN.');
        this.apiGetProducts();
      } else {
        alert('DELETE UNSUCCESSFUL PRODUCTS.');
      }
    });
  }
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('ARE YOU SURE YOU WANT UPDATE PRODUCTS?');
        this.apiGetProducts();
      } else {
        alert('UPDATE UNSUCCESSFUL PRODUCTS.');
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default ProductDetail;