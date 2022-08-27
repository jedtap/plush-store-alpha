import React from "react";
import Images from './Images';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/Newsletter.css';

const Newsletter = ({ toggleWelcome, toggleNewsletter }) => {
  const [nicknameData, setNicknameData] = useState('');
  const [emailData2, setEmailData2] = useState('');
  const nav = useNavigate();

  useEffect(()=>{
    let dummy = 0;
    dummy = dummy + 1;
  },[nicknameData, emailData2])

  const handleSubmitNewsletter = (e) => {
    e.preventDefault();

    // const csrfToken2 = document.querySelector('[name=csrf-token').content
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken2

    axios.post('/subscribers', {nickname: nicknameData, email: emailData2 }) // Add the subscriber
    .then(() => {
      toggleWelcome();
      setNicknameData('');
      setEmailData2('');
      toggleNewsletter();
    })
    .catch( () => { nav("/failed-saving-subscriber") })
  }

  return(<>
    <div className="newsletter-overlay" style={{display: 'none'}}>
      <div className="newsletter-content">
        <h5 className='close-button' onClick={()=>{toggleNewsletter()}}>x</h5>
        <img src={Images[14].img} alt='Pikachu holding a mail letter' className='pikachu-mail' />
        <br/>
        <h4>Get coupons up to</h4>
        <h2>50% DISCOUNT!</h2>
        <h4>Sign-up up now!</h4>
        <br/>
        <form className="newsletter-form" onSubmit={handleSubmitNewsletter} >
          <input type="text" className="form-control" id="nickname" placeholder="Nickname" value={nicknameData} onChange={(e) => setNicknameData(e.target.value)} />
          <input type="email" className="form-control" id="email" placeholder="Best email address" value={emailData2} onChange={(e) => setEmailData2(e.target.value)} />
          <button type="submit" className="btn btn-danger">Subscribe to Newsletter</button>
        </form>
      </div>
    </div>
  </>)
}

export default Newsletter;