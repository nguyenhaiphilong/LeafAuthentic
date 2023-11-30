import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import Footer from './FooterComponent'
import Aa from './AaComponent'
import { toast } from 'react-toastify';


class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
      selectedImage: null,
      selectedSize:'One Size', // Thêm trạng thái mới để theo dõi ảnh chi tiết được chọn
    };
  }
  // Hàm để xử lý khi click vào ảnh chi tiết
  handleDetailImageClick = (image) => {
    this.setState({ 
      currentMainImage: image,  
      selectedImage: image, });  //Cập nhật ảnh chi tiết được chọn
  };
  // gium ảnh chính
  
  render() {
    const prod = this.state.product;
    const currentMainImage = this.state.currentMainImage || (prod && prod.image);
    if (prod != null) {
      return (
        <div className="align-center scroll-animation" style={{width: '100%'}}>
        <div className="align-center">
          <h2 style={{fontFamily: 'cursive'}} className="text-center">PRODUCT DETAILS</h2>
          <figure className="caption-right">
            <div>
            {/* thêm + currentMainImage */}
            <img style={{
                marginLeft: '15%',
              }} src={"data:image/jpg;base64," + currentMainImage} width="400px" height="400px" alt="" />
            {/* //css ảnh chỉ tiết */}
             {prod.imageChitiet.length > 0 && (
           <div className="image-container">
            {prod.imageChitiet.slice(0, 4).map((image, index) => (
              <img
              key={index}
              src={"data:image/jpg;base64," + image}
              width="140px"
              height="140px"
              alt=""
              style={{
                marginRight: '10px',
                border: this.state.selectedImage === image ? '2px solid black' : 'none', // Áp dụng viền đen cho ảnh chi tiết được chọn
                borderRadius: this.state.selectedImage === image ? '8px' : '0px', // Bo tròn góc khi có border
              }}
              onClick={() => this.handleDetailImageClick(image)}
            />
            ))}
            </div>
            )}
            {/* CSS anh chỉ tiết */}
            </div>
            <figcaption>
              <form>
                <table style={{marginLeft: '100px'}} className='DeTail'>
                  <tbody>
                    <tr>
                      <td align="left"><b>Name:</b></td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td align="left"><b>Price:</b></td>
                      <td>{prod.price}$</td>
                    </tr>
                    <tr>
                    {/* chọn size */}
                <td align="left"><b>Size:</b></td>
                <td>
                  <select value={this.state.selectedSize} onChange={this.handleSizeChange}>
                  <option value="OneSIZE">ONESIZE</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </td>
                 </tr>
                    <tr>
                      <td align="left"><b>Category:</b></td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="left"><b>Quantity:</b></td>
                      <td><input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr>
                     
                      <td><input style={{marginLeft: '30%', marginTop: '15%', fontWeight: 'bold', fontSize: '15px', height: '30px', backgroundColor: 'red', 
                borderRadius: '10px', border: '1px', color: 'white'}} type="submit" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
          </div>
          <div>
            <Aa />
          </div>
          <div style={{width: '100%', marginTop: '10%'}}>
          <Footer />
          </div>
        </div>
      );
    }
    return (<div />);
  }
  handleSizeChange = (e) => {
    this.setState({ selectedSize: e.target.value });
  };
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    const size = this.state.selectedSize;
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity,size:size };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      toast.success('Successfully added product to cart');
    } else {
      toast.info('Please input quantity.');
    }
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);