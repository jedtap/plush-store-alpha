import React from "react";

const CheckoutItem = ({ item }) => {
  return(<>
    <div className="checkout-item">
      <img src={item.img} alt={item.alt} className='checkout-item-image' />
      <div className="checkout-item-details">
        <h4>{item.name}</h4>
        <h5>Price per piece: $ {item.price}</h5>
        <h5>Quantity: {item.quantity} pc/s</h5>
        <h5>Subtotal: $ {item.price * item.quantity} </h5>
      </div>
    </div>
  </>)
}

export default CheckoutItem;