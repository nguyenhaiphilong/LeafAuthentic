import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Animation from './AnimationComponent';
import Footer from './FooterComponent'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline scroll-animation">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center"><b>{item.name}</b><br /><b style={{color: 'red', fontSize: '18px'}}>{item.price}$</b></figcaption>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline scroll-animation">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center"><b>{item.name}</b><br /><b style={{color: 'red', fontSize: '18px'}}>{item.price}$</b></figcaption>
          </figure>
        </div>
      );
    });
    return (
      <div>
        <div style={{textAlign: 'center',}}>
          <img height={'350px'} width={'100%'} src= {require('./image/SALE.gif')} />
        </div>
        <Animation />
        <div className="align-center">
          <h2 style={{fontFamily: 'cursive'}} className="text-center">NEW PRODUCTS</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 style={{fontFamily: 'cursive'}} className="text-center">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
          <Footer />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;