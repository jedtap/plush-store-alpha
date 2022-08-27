import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import '../styles/App.css';

import NavBar from './NavBar';
import Home from './Home';
import Shop from './Shop';
import Cart from './Cart';
import Images from './Images';
import NoMatch from './NoMatch';
import Plush from './Plush';
import Checkout from './Checkout';
import OrderConfirmed from './OrderConfirmed';
import Newsletter from './Newsletter';
import WelcomeSubscriber from './WelcomeSubscriber';

function App() {
  const [cartItems, setCartItems]   = useState([]);
  const [itemCount, setItemCount]   = useState(0);
  const [database, setDatabase]     = useState([]);
  const [plushcode, setPlushcode]   = useState(0);
  const [plushdata, setPlushdata]   = useState([]);
  const [grandtotal, setGrandtotal] = useState(0);
  const [term, setTerm]             = useState([]);

  const toggleCart = () => {
    const overlay = document.querySelector('.cart-overlay');
    overlay.style.display === 'none' ? overlay.style.display = 'flex' : overlay.style.display = 'none';
  };

  const toggleWelcome = () => {
    const overlayWelcome = document.querySelector('.welcome-overlay');
    overlayWelcome.style.display === 'none' ? overlayWelcome.style.display = 'flex' : overlayWelcome.style.display = 'none';
  };

  const toggleNewsletter = () => {
    const overlayNewsletter = document.querySelector('.newsletter-overlay');
    overlayNewsletter.style.display === 'none' ? overlayNewsletter.style.display = 'flex' : overlayNewsletter.style.display = 'none';
  };

  const addToCart = (item, qty) => {
    if(cartItems.find(x => x.id === item.id)) {
      // If the item is already in the cart, remove it and add count 1
      const oldItems = cartItems;
      let clickedItem = cartItems.find(x => x.id === item.id);
      clickedItem.quantity += qty;

      const newItems = oldItems.filter(x => x.id !== item.id);
      setCartItems(newItems.concat(clickedItem));

      // Update itemcount
      setItemCount(itemCount+qty);
    } else {
      setCartItems(cartItems.concat( { id: item.id, quantity: qty, name: item.name, price: item.price, img: Images[item.id].img, alt: item.alt }));
      setItemCount(itemCount+qty);
    }
  }

  const lessItem = (item) => {
    const oldItems = cartItems;
    let clickedItem = cartItems.find(x => x.id === item.id);
    clickedItem.quantity -= 1;
    setItemCount(itemCount-1);

    const newItems = oldItems.filter(x => x.id !== item.id);
    clickedItem.quantity <= 0 ? setCartItems(newItems) : setCartItems(newItems.concat(clickedItem));
  }

  const moreItem = (item) => {
    const oldItems = cartItems;
    let clickedItem = cartItems.find(x => x.id === item.id);
    clickedItem.quantity += 1;
    setItemCount(itemCount+1);

    const newItems = oldItems.filter(x => x.id !== item.id);
    setCartItems(newItems.concat(clickedItem));
  }

  const removeItem = (item) => {
    const oldItems = cartItems;
    let clickedItem = cartItems.find(x => x.id === item.id);
    setItemCount(itemCount-clickedItem.quantity);

    const newItems = oldItems.filter(x => x.id !== item.id);
    setCartItems(newItems);
  }

  // Fetch cart info from localStorage on mount
  useEffect(()=>{
    const storedItemCount = JSON.parse(window.localStorage.getItem("storedItemCount"));
    const storedCartItems = JSON.parse(window.localStorage.getItem("storedCartItems"));
    const storedPlushcode = JSON.parse(window.localStorage.getItem("storedPlushcode"));
    const storedPlushdata = JSON.parse(window.localStorage.getItem("storedPlushdata"));
    const storedGrandtotal = JSON.parse(window.localStorage.getItem("storedGrandtotal"));
    if (storedItemCount || storedPlushcode) { 
      setItemCount(storedItemCount);
      setCartItems(storedCartItems);
      setPlushcode(storedPlushcode);
      setPlushdata(storedPlushdata);
      setGrandtotal(storedGrandtotal);
    }
  },[])

  // Save cart to localStorage on data update
  useEffect(()=>{
    window.localStorage.clear();
    window.localStorage.setItem("storedItemCount", JSON.stringify(itemCount));
    window.localStorage.setItem("storedCartItems", JSON.stringify(cartItems));
    window.localStorage.setItem("storedPlushcode", JSON.stringify(plushcode));
    window.localStorage.setItem("storedPlushdata", JSON.stringify(plushdata));
    window.localStorage.setItem("storedGrandtotal", JSON.stringify(grandtotal));
  },[itemCount, cartItems, plushcode, plushdata, grandtotal]);

  useEffect(()=>{
    axios.get('/products.json')
    .then((data)=>{
      setDatabase(data.data.data)
    })
    .catch(()=>{
      window.location = "/nothing-on-sale"
    })
  }, [])

  return (<>
   <BrowserRouter>
      <NavBar openCart={toggleCart} itemCount={itemCount} toggleNewsletter={toggleNewsletter} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<>
          <br/>
          <input className='form-control plushie-search' placeholder='Find a plushie!' onChange={(e) => {setTerm(e.target.value)}}/>
          <br/>
          <div className="shop-gallery"> {database.filter((val)=>{
            if (term === ""){
              return val
            } else if (val.name.toString().toLowerCase().includes(term.toString().toLowerCase())) {
              return val
            }
          }).map((item, key) => <Shop item={item} addToCart={addToCart} setPlushcode={setPlushcode} key={key}/> )} </div>
        </>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='/shop/:id' element={<Plush plushcode={plushcode} plushdata={plushdata} setPlushdata={setPlushdata} addToCart={addToCart} toggleCart={toggleCart} />} />
        <Route path='/checkout' element={<Checkout cartItems={cartItems} grandtotal={grandtotal} setGrandtotal={setGrandtotal} setCartItems={setCartItems} setItemCount={setItemCount} setPlushcode={setPlushcode} setPlushdata={setPlushdata} />} />
        <Route path='/order-success' element={ <OrderConfirmed />} />
      </Routes>
      <Cart closeCart={toggleCart} itemCount={itemCount} cartItems={cartItems} lessItem={lessItem} moreItem={moreItem} removeItem={removeItem} />
      <Newsletter toggleWelcome={toggleWelcome} toggleNewsletter={toggleNewsletter} />
      <WelcomeSubscriber toggleWelcome={toggleWelcome} />
    </BrowserRouter >
  </>);
}

export default App;