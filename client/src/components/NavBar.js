import React from 'react';
import { Link } from "react-router-dom";
import '../styles/NavBar.css';

const NavBar = ({ openCart, itemCount, toggleNewsletter }) => {
  return (<>
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="container-fluid">

        <Link to='/' className="navbar-brand">Poké-plushies</Link>

        <div className="navbar navbar-dark">
          <ul className="navbar-nav">

            <li className="nav-item"> <Link to='/' className="nav-link active">Home</Link> </li>
            <li className="nav-item"> <Link to='/shop' className="nav-link active">Shop</Link> </li>
            <li className="nav-item"> <div className="nav-link active discounts-link" onClick={()=>{toggleNewsletter()}}>Discounts!</div></li>

            <li className="nav-item">
              <div className="nav-link active cart-icon" aria-current="page" onClick={openCart}>🛒</div>
              <span className='CartNum'>{itemCount}</span>
            </li>

          </ul>
        </div>

        </div>
    </nav>
  </>);
};

export default NavBar;