import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as a from '../../actions';
import Header from '../ReusableComponents/Header';
import LogosSection from '../ReusableComponents/LogosSection';
import Footer from '../ReusableComponents/Footer';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart || []);
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [focusedField, setFocusedField] = useState(null);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const updateQuantity = (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        dispatch(a.removeFromCart(id));
      } else {
        dispatch(a.updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  const removeItem = (id) => {
    dispatch(a.removeFromCart(id));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout submission here
    console.log('Checkout submitted:', { paymentInfo, cartItems, total });
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-wrapper">
          {/* Header */}
          <div className="checkout-header animate-in">
            <h1 className="checkout-title">Your Cart</h1>
            <div className="checkout-item-count">
              <span className="checkout-count-badge">{totalItems}</span>
              <span className="checkout-count-text">{totalItems === 1 ? 'item' : 'items'}</span>
            </div>
          </div>

          <div className="checkout-main-grid">
            {/* Cart Items Section */}
            <div className="checkout-cart-section animate-in">
              {cartItems.length === 0 ? (
                <div className="checkout-empty-cart">
                  <span className="checkout-empty-icon">✦</span>
                  <p className="checkout-empty-text">Your cart is empty</p>
                </div>
              ) : (
                <div className="checkout-items-list">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="cart-item cart-item-animated"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="checkout-item-image">
                        {item.img ? (
                          <img src={item.img} alt={item.title || item.name} />
                        ) : (
                          <span>{item.image || '🛍️'}</span>
                        )}
                      </div>
                      <div className="checkout-item-details">
                        <h3 className="checkout-item-name">{item.title || item.name}</h3>
                        <p className="checkout-item-price">${Number(item.price).toFixed(2)}</p>
                        <div className="checkout-quantity-row">
                          <div className="checkout-quantity-controls">
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              −
                            </button>
                            <span className="checkout-qty-display">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                          <span className="checkout-item-total">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <div className="checkout-summary">
                  <div className="checkout-summary-row">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="checkout-summary-row">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'checkout-free-shipping' : ''}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="checkout-divider" />
                  <div className="checkout-total-row">
                    <span>Total</span>
                    <span className="checkout-total-amount">${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="checkout-payment-section animate-in">
              <div className="checkout-payment-header">
                <h2 className="checkout-payment-title">Payment Details</h2>
                <div className="checkout-card-icons">
                  <span className="checkout-card-icon">💳</span>
                </div>
              </div>

              <form className="checkout-payment-form" onSubmit={handleSubmit}>
                <div className="checkout-input-group">
                  <label className="checkout-label">Name on Card</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="John Doe"
                    value={paymentInfo.cardName}
                    onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                    onFocus={() => setFocusedField('cardName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="checkout-input-group">
                  <label className="checkout-label">Card Number</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      handlePaymentChange('cardNumber', formatCardNumber(e.target.value))
                    }
                    onFocus={() => setFocusedField('cardNumber')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="checkout-input-row">
                  <div className="checkout-input-group checkout-input-group-flex">
                    <label className="checkout-label">Expiry</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="MM/YY"
                      value={paymentInfo.expiry}
                      onChange={(e) =>
                        handlePaymentChange('expiry', formatExpiry(e.target.value))
                      }
                      onFocus={() => setFocusedField('expiry')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="checkout-input-group checkout-input-group-flex">
                    <label className="checkout-label">CVV</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={paymentInfo.cvv}
                      onChange={(e) =>
                        handlePaymentChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))
                      }
                      onFocus={() => setFocusedField('cvv')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <button
                  className="checkout-btn"
                  type="submit"
                  disabled={cartItems.length === 0}
                >
                  <span className="checkout-btn-text">
                    Complete Purchase — ${total.toFixed(2)}
                  </span>
                </button>

                <p className="checkout-secure-text">
                  <span className="checkout-lock-icon">🔒</span>
                  Your payment is secure and encrypted
                </p>
              </form>
            </div>
          </div>
        </div>
        <LogosSection />
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
