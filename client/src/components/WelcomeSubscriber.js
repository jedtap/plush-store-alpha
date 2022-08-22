import React from 'react';
import Images from './Images';
import { useNavigate } from "react-router-dom";


const OrderConfirmed = ({ toggleWelcome }) => {
  const nav = useNavigate();

  return(<>
    <div className="welcome-overlay" style={{display: 'none'}}>
      <div className="welcome-content">
        <img src={Images[15].img} alt='Pikachu giving you a welcome hug' className='pikachu-welcome' />
        <br/>
        <h3>Welcome to the Club!</h3>
        <h4>Stay tuned for upcoming sales</h4>
        <div className='btn btn-danger' onClick={()=>{
          toggleWelcome();
          nav('/shop');
        }}>Checkout More Plushies!</div>
      </div>
    </div>
  </>)
}

export default OrderConfirmed;