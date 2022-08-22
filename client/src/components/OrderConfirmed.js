import React from 'react';
import Images from './Images';
import { useEffect } from 'react';

const OrderConfirmed = () => {

  useEffect(() => {
    setTimeout(() => {
      window.location = "/shop";
    }, 10000);
  }, [])

  return(<>
    <div className="overlay" style={{display: 'flex'}}>
      <div className="success-order">
        <img src={Images[13].img} alt='Pikachu giving a thumbs up' className='pikachu-thumbs-up' />
        <br/>
        <h3>Order successful!</h3>
        <div className='btn btn-danger' onClick={()=>{ window.location = "/shop" }}>Checkout More Plushies!</div>
      </div>
    </div>
  </>)
}

export default OrderConfirmed;