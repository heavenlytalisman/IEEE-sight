import React, { useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      alert('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section alt">
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p className="section-subtitle">
            Connect with us to join our humanitarian technology mission
          </p>
        </div>

        <div className="contact-content reveal-up">
          <div className="contact-form-section">
            <h3>Send us a Message</h3>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                  required
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="membership">Membership Inquiry</option>
                  <option value="collaboration">Collaboration Proposal</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="general">General Question</option>
                </select>
                {errors.subject && <div className="error-message">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={errors.message ? 'error' : ''}
                  required
                ></textarea>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>

              <button type="submit" className={`btn primary submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                <span className="btn-text">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {isSubmitting && <span className="btn-loading">⏳</span>}
              </button>
            </form>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h4>Email Us</h4>
              <p>sight@ieee-sbcek.org</p>
              <a href="mailto:sight@ieee-sbcek.org" className="contact-link">Send Email</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
              <a href="tel:+919876543210" className="contact-link">Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
