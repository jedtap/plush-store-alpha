import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Cart.css';

const Cart = ({ closeCart, itemCount, cartItems, lessItem, moreItem, removeItem }) => {

  const displayCartItems = (
    (itemCount > 0) ? cartItems.map((item, key) =>

      <div className='cart-item' key={key} >
        <img src={item.img} alt={item.alt} className='cart-item-image' />
        <div className='cart-item-details'>
          <h5>{item.name}</h5>
          <h6>$ {item.price}</h6>
        </div>
        <div className='cart-item-quantity'>
          <div className='cart-item-hover' onClick={() => lessItem(item)}>—</div>
          <div> {item.quantity} </div>
          <div className='cart-item-hover' onClick={() => moreItem(item)}> + </div>
          <div className='cart-item-hover' onClick={() => removeItem(item)}> Remove </div>
        </div>
      </div>

    ) : null
  );

  return (<>
    <div className='cart-overlay' style={{display: 'none'}}>
      <div className='cart-main'>

        <div className='cart-header'>
          <div className='cart-close' onClick={closeCart}>x</div>
          <h3>Shopping Cart</h3>
          <h6>{itemCount} items</h6>
        </div>

        <div className='cart-content'> {displayCartItems} </div>

        <Link to='/checkout'>
          <button type="button" className="btn btn-danger checkout-button" onClick={closeCart} >Proceed to checkout </button>
        </Link>
      </div>
    </div>
  </>);
};

export default Cart;