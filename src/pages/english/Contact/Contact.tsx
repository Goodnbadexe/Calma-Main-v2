import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Contact Us</h1>
            <p>We are here to help you realize your residential dream</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="contact-card"
            >
              <MapPin className="contact-icon" />
              <h3>Address</h3>
              <p>Riyadh, Saudi Arabia</p>
              <p>Al Malqa District, King Fahd Road</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="contact-card"
            >
              <Phone className="contact-icon" />
              <h3>Phone</h3>
              <p>+966 92 000 6553</p>
              <p>Available 24/7</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-card"
            >
              <Mail className="contact-icon" />
              <h3>Email</h3>
              <p>info@calma.sa</p>
              <p>sales@calma.sa</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="contact-card"
            >
              <Clock className="contact-icon" />
              <h3>Working Hours</h3>
              <p>Sunday - Thursday: 9:00 - 18:00</p>
              <p>Friday - Saturday: Closed</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="form-container"
          >
            <h2>Send us a message</h2>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select Subject</option>
                    <option value="residential">Residential Projects</option>
                    <option value="commercial">Commercial Projects</option>
                    <option value="investment">Investment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} required></textarea>
              </div>
              <Button type="submit" className="submit-btn">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Our Location</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>Site Map</p>
              <p>Riyadh, Saudi Arabia</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
