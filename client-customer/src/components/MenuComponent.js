import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import './css/MenuMulti.css'
import { toast } from 'react-toastify';


class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      showMenu: false,

    };
  }
  toggleMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  renderCategories = () => {
    return this.state.categories.map((item) => (
      <li key={item._id} className='menu'>
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));
  };

  

  render() {
    return (
      <div style={{paddingBottom: '10px', paddingTop: '10px',paddingLeft: '10px',
      paddingRight: '10px', marginBottom: '10px', borderRadius: '2px'}} className="border-bottom Cloud9 scroll-animation">
        {/*  */}
        <div className="float-left scroll-animation2 Alo">
        <button className="toggleButton" onClick={this.toggleMenu}>
            <span>&#9776;</span> {/* Hamburger icon */}
          </button>
     
          <ul className={`ulMenu ${this.state.showMenu ? 'showMenu' : ''}`}>

           <b><li className="menu"><Link to='/'><b>Store</b></Link></li>{this.renderCategories()}</b>
          </ul>
        </div>
        {/*  */}
        <div className="float-right">
        <form className="search">
          <input style={{marginRight: '2px', borderBottom: '1px solid black', 
        borderTop: '0px', borderLeft: '0px', borderRight: '0px',
        width: '130px', marginLeft: '20px', paddingLeft: '5px',}} type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
          <input style={{borderRadius: '25px',}} type="submit" value="🔍" onClick={(e) => this.btnSearchClick(e)} />
        </form>
        </div>
        <div className="float-right">
         {this.context.token === '' ?
          <div className='G2E'>
          <div class="G2">
            <ul>
                <li>
                    <b className='G2' style={{paddingRight: '2px',}}>👤</b>
                    <ul className='G'>
                        <li style={{borderTopLeftRadius: '10px'}}>
                          <Link to='/login'>Login</Link>
                        </li>
                        <li>
                          <Link to='/signup'>Sign-up</Link>
                        </li>
                        <li style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
                          <Link to='/active'>Active</Link>
                        </li>
                    </ul>
                </li>
            </ul>
          </div>
          </div>
          :
          <div>
          <div class="NAVI">
            <ul>
                <li>
                    Hello: <b>{this.context.customer.name}</b>
                    <ul className='NV'>
                        <li>
                          <Link to='/myprofile'>My profile</Link>
                        </li>
                        <li>
                        <Link to='/myorders'>My orders</Link>
                          </li>
                        <li style={{borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
                          <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
                        </li>
                    </ul>
                </li>
            </ul>
          </div>
          </div>
        }
      </div>
        <div className="float-clear" />
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
  btnSearchClick = (e) => {
    e.preventDefault();
    if(this.state.txtKeyword){
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
    //  tìm kiến khi không nhập gì
    else{
      toast.info("Please Enter Search Information");
    }
    
  };
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default withRouter(Menu);