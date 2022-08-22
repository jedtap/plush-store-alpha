import React from "react";
import { useEffect } from 'react';
import axios from 'axios';
import Images from './Images';


const Plush = ({ plushcode, plushdata, setPlushdata, addToCart, toggleCart }) => {

  useEffect(()=>{
    const api = '/products/' + plushcode + '.json';

    axios.get(api)
    .then((data)=>{
      setPlushdata(data.data.data);
    })
    .catch(()=>{
      console.log('oops');
    })
  }, [])

  return(<>
    <div className="plush-area">
      <img src={Images[plushcode].img} alt={plushdata.alt} className='plush-image' />
      <div className="plush-data">
        <h3> {plushdata.name} </h3> 
        <h5> ${plushdata.price} </h5>
        <div className="plush-line-break"></div>
        <div className="form-wrapper">
          <select className="form-select">
            <option value="1">1 pc</option>
            <option value="2">2 pcs</option>
            <option value="3">3 pcs</option>
            <option value="4">4 pcs</option>
            <option value="5">5 pcs</option>
          </select>
        </div>

        <div className="plush-call-to-action">
          <div className="btn btn-outline-danger plush-add-to-cart" onClick={()=>{
            const qty = parseInt(document.querySelector(".form-select").value);
            addToCart(plushdata, qty);
          }}>Add to cart</div>
          <div className="btn btn-danger plush-buy-now" onClick={()=> {
            addToCart(plushdata, 1);
            toggleCart();
          }}>Buy now</div>
        </div>
      </div>
    </div>
  </>)
}

export default Plush;