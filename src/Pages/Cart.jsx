import axios from "axios";
import "../CSS/cart.css";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IsLoading from "../Components/IsLoading";
import IsError from "../Components/IsError";

const Cart = () => {
  const { id } = useParams();
  const URL = "https://fakestoreapi.com/products";
  const [cart, setCart] = useState([]);  // Cart state initialized as an array
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  // Function to fetch product data
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${id}`);
      const newCartItem = { ...res.data, count: 1 }; // Add count to each item
      setLoading(false);
      setError(false);

      // Check if the item already exists in the cart before adding
      setCart(prevCart => {
        const exists = prevCart.find(item => item.id === newCartItem.id);
        if (exists || id == 'undefined') {
          return prevCart;
        }
        return [...prevCart, newCartItem];
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };

  console.log(cart)

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    getData()
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to handle incrementing item quantity
  const handleIncrement = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Function to handle decrementing item quantity
  const handleDecrement = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const handleRemoveItemFromoCart = (id) => {
    // confirm("DO YOU WANT TO REMVOVE THIS ITEM FROM CART ? ")
    setCart(prevCart =>
      prevCart.filter(el => el.id !== id)
    )
  }
  const handleCheckout = () => {
    navigate('/payment', { state: { cartItems: cart } });
};

  return (
    <div className="CartContainer">
      {/* Cart List */}
      {
        isLoading ? <IsLoading /> : isError ? <IsError /> :
         cart && cart.slice().reverse().map(el => (
          <div className="cart-box">
            <div className="contient-box">
              <div className="img-box">
                <img src={el.image} alt={el.title} />
              </div>
              <div className="title">
                <b>{el.title}</b>
                <p><span>Category</span>: {el.category}</p>
                <p><span>Rating</span>: {el.rating?.rate} ⭐</p>
                <div className="cart-refer">
                  <button onClick={() => handleRemoveItemFromoCart(el.id)} className="remove btn">Remove</button>
                  {/* <button className="checkout btn">Checkout</button> */}
                </div>
              </div>
              <div className="price">
                <p><span>Price</span> : Rs.{(el.price * el.count).toFixed(2)}</p>
                <div className="product-size">
                  <button onClick={() => handleDecrement(el.id)} disabled={el.count <= 1} className="btn-product">-</button>
                  <b>{el.count}</b>
                  <button onClick={() => handleIncrement(el.id)} className="btn-product">+</button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))
      }
      <div className="total-price">
        <div className="items">
          {/* <h4>Total Items: {cart.reduce((acc, item) => acc + item.count, 0)}</h4> */}
          <h4>Total Items: {cart.length}</h4>
          <input type="text" className="card-off" placeholder=" Add discount card" />
        </div>
        <div className="cart-items">
          <h4>Total Price: Rs.{cart.reduce((acc, item) => acc + item.price * item.count, 0).toFixed(2)}</h4>
          <button className="checkout btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
