import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/payment.css';

const phonepeLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvfA-R2BKVmud5D-BOkkDhkRI2HeaB_HBPoZWD88o-FuzFczqNzlO8F2-YdWOqnEiYxFk&usqp=CAU';
const gpayLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h-c6eokt4xjMCBl2RNDssP-Y6ZMfAmk8fw&s';
const paytmLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_c1T2I3DoG-03pH4fTZei897Nl1ydyDtmQ&s';

const PaymentPage = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = Math.random() > 0.5;
    setPaymentStatus(success ? 'success' : 'failed');
  };

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].count;
    }
    return total;
  };

  return (
    <div className="payment-page">
      <h1>Checkout</h1>
      <div className="section">
        <h2>Order Summary</h2>
        <div className="order-summary">
          {cartItems.map((item) => (
            <ul key={item.id}>
              <li>
                {item.title} (x{item.count}):<b>Rs.{(item.price * item.count).toFixed(2)}</b>
              </li>
            </ul>
          ))}
          <b>Shipping: Rs.5.00</b>
          <h3>Total: Rs.{(calculateTotal() + 5).toFixed(2)}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="section">
          <h2>Billing Details</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Phone Number" required />
        </div>

        <div className="section">
          <h2>Shipping Address</h2>
          <input type="text" placeholder="Address Line 1" required />
          <input type="text" placeholder="Address Line 2" />
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State/Province" required />
          <input type="text" placeholder="ZIP/Postal Code" required />
          <input type="text" placeholder="Country" required />
        </div>

        <div className="section">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={handlePaymentMethodChange}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                value="netBanking"
                checked={paymentMethod === 'netBanking'}
                onChange={handlePaymentMethodChange}
              />
              Net Banking
            </label>
            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={handlePaymentMethodChange}
              />
              UPI
            </label>
          </div>

          {paymentMethod === 'creditCard' && (
            <div className="credit-card-info">
              <input type="text" placeholder="Card Number" required />
              <input type="text" placeholder="Name on Card" required />
              <input type="text" placeholder="Expiry Date (MM/YY)" required />
              <input type="text" placeholder="CVV" required />
            </div>
          )}

          {paymentMethod === 'netBanking' && (
            <div className="net-banking-info">
              <select required>
                <option value="">Select Your Bank</option>
                <option value="bank1">Bank 1</option>
                <option value="bank2">Bank 2</option>
                <option value="bank3">Bank 3</option>
              </select>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="upi-info">
              <div className="upi-options">
                <label>
                  <input type="radio" name="upi" value="phonepe" />
                  <img src={phonepeLogo} alt="PhonePe" className="payment-logo" />
                </label>
                <label>
                  <input type="radio" name="upi" value="gpay" />
                  <img src={gpayLogo} alt="Google Pay" className="payment-logo" />
                </label>
                <label>
                  <input type="radio" name="upi" value="paytm" />
                  <img src={paytmLogo} alt="Paytm" className="payment-logo" />
                </label>
              </div>
            </div>
          )}
        </div>
        <button type="submit" className="submit-button">Place Order</button>

        {paymentStatus === 'success' && (
          <div className="payment-status success">
            <p>Payment Successful!</p>
          </div>
        )}
        {paymentStatus === 'failed' && (
          <div className="payment-status failed">
            <p>Payment Failed. Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentPage;

