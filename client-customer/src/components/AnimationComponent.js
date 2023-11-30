import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const slideProperties = {
      duration: 1500, // Thời gian giữa các chuyển đổi slide (1.5 giây)
      autoplay: true, // Tự động chuyển đổi slide
      onChange: () => {}, // Các hàm không thực hiện gì
      onStartChange: () => {} // Các hàm không thực hiện gì
    };
    return (
        <Slide {...slideProperties}>
  <div className="each-slide-effect">
    <div width={'100%'}>
      <img height={'100%'} width={'95%'}  src= {require('./image/ADLV.png')} />
    </div>
  </div>
  <div className="each-slide-effect">
  <div width={'100%'}>
  <img height={'100%'} width={'95%'}  src= {require('./image/DrewHouse.png')} />
    </div>
  </div>
  <div className="each-slide-effect">
  <div width={'100%'}>
  <img height={'100%'} width={'95%'}  src= {require('./image/RipnDip.png')} />
    </div>
  </div>
  <div className="each-slide-effect">
  <div width={'100%'}>
  <img height={'100%'} width={'95%'}  src= {require('./image/NewEra.png')} />
    </div>
  </div>
</Slide>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
}
export default withRouter(Animation);