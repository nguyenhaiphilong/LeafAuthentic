import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
        <div className= "Footer">
          <div className='Footer-1'>  
              <div className='Footer-1-1'>
                <div className='Footer-1-1-0'>
                  <img height={'115px'} src= {require('./image/logo.png')} />
                </div>
                <div className='Footer-1-1-1'>

                </div>
                <div className='Footer-1-1-2'>
                  <div>
                    <h4 style={{textAlign: 'left', marginTop: '0px',
                    marginBottom: '0px', fontFamily: 'cursive'}}>Store Info:</h4>
                    <p style={{textAlign: 'left', marginTop: '0px',
                    marginBottom: '0px', fontSize: '13px', fontWeight: '500'}}>
                      🍀 Working time: (8am to 10pm)
                      <br />
                      🍀 Hotline: +01 6868686868
                      <br />
                      🍀 Address: CityCenterDC
                          825 10th St NW, Washington, DC 20001, USA
                    </p>
                  </div>
                </div>
                <div className='Footer-1-1-3'>
                <iframe title="gmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.7366825503177!2d-77.02599006381597!3d38.90062209407932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b793da059bdf%3A0xd28041ff95c9e868!2sCityCenterDC!5e1!3m2!1svi!2s!4v1701004585385!5m2!1svi!2s" 
                width="90%" height="80%" style={{ border: 0, borderRadius: '5px' }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className='Footer-1-1-4'>
                  <h4 style={{textAlign: 'center', marginBottom: '0',fontFamily: 'cursive', marginTop: '6%'}}>
                      Main Pages
                    </h4>
                    <p style={{marginTop: '0px', marginBottom: '0px', textAlign: 'center', color: 'black'}}>
                      <Link style={{color: 'black'}} to='/'>Store</Link>
                    </p>
                    <p style={{marginTop: '0px', marginBottom: '0px', textAlign: 'center', color: 'black'}}>
                      <Link style={{color: 'black'}} to='/login'>Login</Link>
                    </p>
                    <p style={{marginTop: '0px', marginBottom: '0px', textAlign: 'center', color: 'black'}}>
                      <Link style={{color: 'black'}} to='/signup'>Sign-up</Link>
                    </p>
                    <p style={{marginTop: '0px', marginBottom: '0px', textAlign: 'center', color: 'black'}}>
                      <Link style={{color: 'black'}} to='/active'>Active</Link>
                    </p>
                </div>
              </div>
              <div style={{textAlign: 'center'}} className='Footer-1-2'>  
                <b style={{fontFamily: 'cursive', color: 'white'}}>
                  " The satisfaction of our customers is the joy of the LEAF AUTHENTIC team "
                </b>
              </div>
          </div>
          <div className='Footer-2'>
            <div>
              <b>© 2023 Copyright: LEAF AUTHENTIC</b>
            </div>    
          </div>
        </div>
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
export default withRouter(Footer);