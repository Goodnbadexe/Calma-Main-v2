import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './تواصل معنا.css';

export default function ArabicContact() {
  return (
    <main className="contact-page" dir="rtl">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>تواصل معنا</h1>
            <p>نحن هنا لمساعدتك في تحقيق حلمك السكني</p>
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
              <h3>العنوان</h3>
              <p>الرياض، المملكة العربية السعودية</p>
              <p>حي الملقا، طريق الملك فهد</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="contact-card"
            >
              <Phone className="contact-icon" />
              <h3>الهاتف</h3>
              <p>+966 92 000 6553</p>
              <p>متاح 24/7</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-card"
            >
              <Mail className="contact-icon" />
              <h3>البريد الإلكتروني</h3>
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
              <h3>ساعات العمل</h3>
              <p>الأحد - الخميس: 9:00 - 18:00</p>
              <p>الجمعة - السبت: مغلق</p>
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
            <h2>أرسل لنا رسالة</h2>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">الاسم الكامل</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">الموضوع</label>
                  <select id="subject" name="subject" required>
                    <option value="">اختر الموضوع</option>
                    <option value="residential">مشاريع سكنية</option>
                    <option value="commercial">مشاريع تجارية</option>
                    <option value="investment">استثمار</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">الرسالة</label>
                <textarea id="message" name="message" rows={6} required></textarea>
              </div>
              <Button type="submit" className="submit-btn">
                إرسال الرسالة
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>موقعنا</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>خريطة الموقع</p>
              <p>الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}