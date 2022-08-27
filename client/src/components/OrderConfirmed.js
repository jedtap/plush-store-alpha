import React from 'react';
import Images from './Images';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmed.css';

const OrderConfirmed = () => {
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      nav("/shop");
    }, 10000);
  }, [])

  return(<>
    <div className="overlay" style={{display: 'flex'}}>
      <div className="success-order">
        <img src={Images[13].img} alt='Pikachu giving a thumbs up' className='pikachu-thumbs-up' />
        <br/>
        <h3>Order successful!</h3>
        <div className='btn btn-danger' onClick={()=>{ nav("/shop") }}>Checkout More Plushies!</div>
      </div>
    </div>
  </>)
}

export default OrderConfirmed;