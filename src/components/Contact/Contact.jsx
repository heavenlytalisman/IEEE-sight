import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiUser, HiChatAlt } from "react-icons/hi";
import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const contacts = [
    { icon: HiMail, value: "sight@ieee-sbcek.org", link: "mailto:sight@ieee-sbcek.org" },
    { icon: HiPhone, value: "+91 98765 43210", link: "tel:+919876543210" }
  ];

  const handleChange = ({ target }) => {
    setFormData(f => ({ ...f, [target.name]: target.value }));
    setErrors(e => ({ ...e, [target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid";
    if (formData.message.length < 10) e.message = "Too short";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);
    setSending(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Get In Touch</h2>
          <p>Ready to make an impact? Let's connect.</p>
        </motion.div>

        <motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <HiUser className="field-icon" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <HiMail className="field-icon" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-field">
              <HiChatAlt className="field-icon" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={3}
                maxLength={300}
                className={errors.message ? "error" : ""}
              />
              <div className="char-count">{formData.message.length}/300</div>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <button
              type="submit"
              disabled={sending}
              className={`submit-btn ${sending ? "loading" : ""} ${sent ? "success" : ""}`}
            >
              {sent ? "Sent ✓" : sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="contact-info">
            {contacts.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={i}
                  href={contact.link}
                  className="contact-item"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="contact-icon" />
                  <span>{contact.value}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
