import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Checkout.css';


import CheckoutItem from './CheckoutItem';

const Checkout = ({ cartItems, grandtotal, setGrandtotal, setCartItems, setItemCount, setPlushcode, setPlushdata }) => {
  const [nameData, setNameData] = useState('');
  const [addressData, setAddressData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [cellphoneData, setCellphoneData] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [check, setCheck] = useState('');

  useEffect(()=>{
    let total = 0;
    cartItems.map((item)=> total = total + (item.price * item.quantity));
    setGrandtotal(total);
  },[cartItems]);

  useEffect(()=>{
    let dummy2 = 0;
    dummy2 = dummy2 + 1;
  },[nameData, addressData, emailData, cellphoneData, paymentData])

  const handleSubmit = (e) => {
    e.preventDefault();

    // const csrfToken = document.querySelector('[name=csrf-token').content;
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    if (check === 'checked') {
      axios.post('/subscribers', {nickname: nameData, email: emailData }) // Add the subscriber
      .catch( () => { window.location = "/failed-saving-subscriber" })
    };

    axios.post('/buyers', {name: nameData, address: addressData, email: emailData, cellphone: cellphoneData, payment: paymentData }) // Add the buyer
    .then(()=>{

      axios.get('/last_buyer.json') // Get ID of the newly added buyer
      .then((data)=>{
        console.log(data);
        debugger;
      })
      .catch(()=>{ window.location = "/failed-getting-last-buyer" });

    })
    .catch(()=>{ window.location = "/failed-saving-shipping-details" });

    // .then(data => {
    //   cartItems.map((order) => {       // check push order data below     
    //     let pushOrder = {quantity: order.quantity, price: order.price, subtotal: order.quantity * order.price, buyer_id: data.data.data, product_id: order.id };
    //     axios.post('/orders', pushOrder) // Add the buyer
    //     .then(()=>{ // clean-up
    //       window.location = "/order-success"; 
    //       setCartItems([]);
    //       setItemCount(0);
    //       setPlushcode(0);
    //       setPlushdata([]);
    //       setGrandtotal(0);
    //     })
    //     .catch( () => { window.location = "/failed-order-push" });
    //   });
    // })
  }

  return(<>
      <div className="checkout-area">
        <h3>Ready for shipment!</h3>
        <div className="checkout-items">
          {cartItems.map((item) => <CheckoutItem item={item} /> )}
        </div>
        <div className="checkout-grand-total"> 
          <h5>Total: $ {grandtotal} </h5>
        </div>
        <h3 className="shipping-details-header">Shipping details</h3>
        <div className="checkout-form-wrapper">
          <form className="checkout-form" onSubmit={handleSubmit} >
            <input type="text" className="form-control" id="name" placeholder="Receiver's name" value={nameData} onChange={(e) => setNameData(e.target.value)} />
            <input type="text" className="form-control" id="address" placeholder="Delivery address" value={addressData} onChange={(e) => setAddressData(e.target.value)} />
            <input type="email" className="form-control" id="email" placeholder="Email address" value={emailData} onChange={(e) => setEmailData(e.target.value)}  />
            <input type="number" className="form-control" id="cellphone" min="100000" max="9999999999" placeholder="Best contact number" value={cellphoneData} onChange={(e) => setCellphoneData(e.target.value)}  />
            <input type="text" className="form-control" id="payment" placeholder="Enter payment code (used to mock a payment input)" value={paymentData} onChange={(e) => setPaymentData(e.target.value)} />
            <div class="form-check">
              <input className="form-check-input" type="checkbox" value={check} checked={check} id="flexCheckDefault" onChange={(e) => { check === '' ? setCheck('checked') : setCheck('') }}/>
              <label className="form-check-label" for="flexCheckDefault"> Subscribe me for discounts! </label>
            </div>
            <button type="submit" className="btn btn-danger">Confirm Order</button>
          </form>
        </div>
      </div>
  </>)
}

export default Checkout;