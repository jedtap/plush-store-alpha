import React from 'react';
import { Link } from "react-router-dom";
import Images from './Images';

const NoMatch = () => {
  return(<>
    <div className='no-match'>
      <img src={Images[12].img} alt='Dizzy Pikachu' className='pikachu-dizzy' />
      <h3>Well this is awkward..</h3>
      <h4>Something did no go well</h4>
      <br/>
      <Link to='/shop' className="btn btn-danger home-screen-button">Return to Shop</Link>
    </div>
  </>)
}

export default NoMatch;