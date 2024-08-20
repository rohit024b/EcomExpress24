import React, { useState } from 'react';
import '../CSS/contact.css';

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const res = await fetch('https://formspree.io/f/xovanaar', { 
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        setFormStatus('success');
        event.target.reset(); 
      } else {
        setFormStatus('failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('failed');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>If you have any questions or need further assistance, please reach out to us through the following methods:</p>
          <ul>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/phone.png" alt="Phone Icon" />
              <span>+918888888888</span>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/email.png" alt="Email Icon" />
              <span>support@gmail.com</span>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/map-marker.png" alt="Address Icon" />
              <span>xyz</span>
            </li>
          </ul>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit">Send Message</button>
            {formStatus === 'success' && (
              <div className="form-status success">
                <p>Your message has been sent successfully!</p>
              </div>
            )}
            {formStatus === 'failed' && (
              <div className="form-status failed">
                <p>There was an error sending your message. Please try again.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
