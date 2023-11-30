import React, { Component } from 'react';
import Footer from './FooterComponent'

class Gmap extends Component {
  render() {
    return (
      <div width='100%' height='auto' className="Gmap">
        <h2 style={{fontFamily: 'cursive'}} className="text-center">MY LOCATION</h2>
        <div style={{textAlign: 'center'}} className='maps'>
        <iframe title="gmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.7366825503177!2d-77.02599006381597!3d38.90062209407932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b793da059bdf%3A0xd28041ff95c9e868!2sCityCenterDC!5e1!3m2!1svi!2s!4v1701004585385!5m2!1svi!2s" width="800" height="600" style={{ border: 0, borderRadius: '20px' }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Gmap;