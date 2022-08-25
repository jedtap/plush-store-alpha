import React from 'react';
import Images from './Images';
import { Link } from "react-router-dom";
import '../styles/Shop.css';

const Shop = ({ item, addToCart, setPlushcode, key }) => {
  return (<>
    <div className="shop-item" onClick={()=>setPlushcode(item.id)} key={key} >
      <Link to={item.name}>
        <img src={Images[item.id].img} alt={item.alt} className='shop-item-image' />
      </Link>
      <Link to={item.name} className="shop-item-name-a">
        <h2 className="shop-item-name">{item.name}</h2>
      </Link>
      <div className="shop-item-price">$ {item.price}</div>
      <div className="btn btn-danger" onClick={() => addToCart(item, 1)} data-id={item.id}>Add to cart</div>
    </div>
  </>);
};

export default Shop;