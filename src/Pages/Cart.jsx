import React from "react";
import "../CSS/cart.css";
const Cart = () => {
  return (
    <div>
      {/* cart list */}
      {/* cart card - buttons - remove frm cart, checkout */}

      <div className="cart-box">
        <div className="contient-box">
          <div className="img-box">
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt=""
            />
          </div>
          <div className="title">
            <p> <span>Title</span>: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</p>
            <p><span>Category</span>: men's clothing</p>
            <p><span>rating</span>: rate": 3.9</p>

            <div className="cart-refer">
              <button className="remove btn">Remove Cart</button>
              <button className="checkout btn">Checkout</button>
            </div>
          </div>

          <div className="price">
            <p><span>price</span> : 109.95</p>
            <div className="product-size">
              <button className="btn-product">+</button>
              <input type="number" className="product-count" />
              <button className="btn-product">-</button>
            </div>
          </div>
        </div>

        <hr />

        <div className="total-price">
        <div className="items">
            <h4>Total Items: 4</h4>
            <input type="text" className="card-off" placeholder=" Add discount card" />
          </div>
          <div className="cart-items">
            <h4>Total Price : 200 $</h4>
            <button className="checkout btn">Checkout</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
