import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Heart, MessageCircle, Share2, Linkedin } from 'lucide-react';
import './الأخبار.css';
import type { شركةخبر } from '@/data/news.ar'
import { الاخبارAR as newsAr } from '@/data/news.ar'
import { apiClient } from '@/utils/apiClient'
import { useTelemetry } from '@/utils/telemetry'

interface LinkedInPost {
  id: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
  link?: string;
}

// Mock LinkedIn posts data - Replace with actual LinkedIn API integration
const mockLinkedInPosts: LinkedInPost[] = [
  {
    id: '1',
    content: 'Excited to announce the completion of our latest residential project in Riyadh! 🏗️ Another milestone in creating spaces where vision takes shape. #CALMA #RealEstate #Riyadh',
    author: 'CALMA Real Estate',
    date: '2024-01-15',
    likes: 127,
    comments: 23,
    shares: 15,
    image: '/api/placeholder/600/400',
    link: 'https://linkedin.com/company/calmasa'
  },
  {
    id: '2',
    content: 'Our commitment to sustainability continues with the integration of cutting-edge green technologies in all new developments. Building tomorrow\'s communities today! 🌱 #Sustainability #Vision2030',
    author: 'CALMA Real Estate',
    date: '2024-01-12',
    likes: 89,
    comments: 12,
    shares: 8,
    link: 'https://linkedin.com/company/calmasa'
  },
  {
    id: '3',
    content: 'Proud to have connected over 2,000 residents to their dreams. Each project represents more than development – it\'s about creating communities where potential flourishes. ✨',
    author: 'CALMA Real Estate',
    date: '2024-01-10',
    likes: 156,
    comments: 31,
    shares: 22,
    image: '/api/placeholder/600/300',
    link: 'https://linkedin.com/company/calmasa'
  }
];

const newsArticles: شركةخبر[] = newsAr

export default function News() {
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [subscribeMsg, setSubscribeMsg] = useState<string | null>(null)
  const { trackPerformance, trackError } = useTelemetry()

  useEffect(() => {
    const fetchLinkedInPosts = async () => {
      setLoading(true);
      try {
        const data = await apiClient.get<any[]>('/api/linkedin/posts')
        const mapped: LinkedInPost[] = data.map((p) => ({
          id: p.id,
          content: p.text ?? '',
          author: 'CALMA Real Estate',
          date: new Date(p.createdAt).toISOString(),
          likes: p.metrics?.likes ?? 0,
          comments: p.metrics?.comments ?? 0,
          shares: p.metrics?.shares ?? 0,
          image: p.thumbnailUrl ?? p.mediaUrl,
          link: p.link,
        }))
        setLinkedInPosts(mapped)
      } catch (err) {
        setLinkedInPosts(mockLinkedInPosts)
      } finally {
        setLoading(false)
      }
    }
    fetchLinkedInPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="news-page" dir="rtl">
      <Helmet>
        <title>كالما — آخر الأخبار والتحديثات</title>
        <meta name="description" content="ابقَ على اطلاع برحلة كالما. أحدث الأخبار والمنشورات والبيانات الصحفية." />
        <meta property="og:title" content="كالما — آخر الأخبار والتحديثات" />
        <meta property="og:description" content="أخبار تحريرية مميزة مع موجز مباشر من لينكدإن وتحديثات الشركة." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calma.sa/news" />
      </Helmet>
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1>آخر الأخبار والتحديثات</h1>
            <p>ابقَ على اتصال برحلة كالما ونحن نواصل تشكيل مستقبل التطوير العقاري في المملكة العربية السعودية.</p>
          </motion.div>
        </div>
        <div className="hero-gradient"></div>
      </section>

      <div className="news-container">
        {/* LinkedIn Feed Section */}
        <section className="linkedin-section">
          <div className="section-header">
            <div className="header-content">
              <Linkedin className="linkedin-icon" />
              <div>
                <h2>تحديثات لينكدإن</h2>
                <p>تابع أحدث منشوراتنا وتحديثات الشركة</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              className="follow-btn"
              onClick={() => window.open('https://www.linkedin.com/company/calmasa/posts/?feedView=all&viewAsMember=true', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              تابعنا على لينكدإن
            </Button>
          </div>

          <div className="linkedin-posts">
            {loading ? (
              <div className="loading-posts">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="post-skeleton">
                    <div className="skeleton-header"></div>
                    <div className="skeleton-content"></div>
                    <div className="skeleton-footer"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="posts-grid">
                {linkedInPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="linkedin-post"
                  >
                    <div className="post-header">
                      <div className="post-author">
                        <div className="author-avatar">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div className="author-info">
                          <h4>{post.author}</h4>
                          <span className="post-date">{formatDate(post.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="post-content">
                      <p>{post.content}</p>
                      {post.image && (
                        <div className="post-image">
                          <img src={post.image} alt="Post content" />
                        </div>
                      )}
                    </div>

                    <div className="post-engagement">
                      <div className="engagement-stats" aria-label="Post engagement statistics">
                        <span title="Likes"><Heart className="w-4 h-4" /> {post.likes}</span>
                        <span title="Comments"><MessageCircle className="w-4 h-4" /> {post.comments}</span>
                        <span title="Shares"><Share2 className="w-4 h-4" /> {post.shares}</span>
                      </div>
                      {post.link && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(post.link, '_blank')}
                        >
                          عرض على لينكدإن
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* News Articles Section */}
        <section className="news-articles">
          <div className="section-header">
            <h2>أخبار الشركة</h2>
            <p>أحدث الإعلانات والبيانات الصحفية</p>
          </div>

          <div className="articles-grid">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="news-article"
              >
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-category">{article.category}</div>
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  {article.link && article.link !== '#' ? (
                    <a href={article.link} target="_blank" rel="noopener" className="read-more" aria-label={`اقرأ المزيد: ${article.title}`}>
                      <Button variant="ghost">
                        اقرأ المزيد
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <>
                      <Button variant="ghost" className="read-more" disabled>
                        اقرأ المزيد
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      {/* TODO: Supply real article URLs for Read More links */}
                    </>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="newsletter-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="newsletter-content"
          >
            <h2>ابقَ على اطلاع</h2>
            <p>اشترك في نشرتنا البريدية للحصول على آخر الأخبار وتحديثات المشاريع</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني"
                className="email-input"
                value={email}
                aria-invalid={!!subscribeMsg && subscribeMsg.startsWith('يرجى إدخال')}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                className="subscribe-btn"
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true)
                  setSubscribeMsg(null)
                  try {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      setSubscribeMsg('يرجى إدخال بريد إلكتروني صالح')
                      setSubmitting(false)
                      return
                    }
                    const start = performance.now()
                    await apiClient.post('/api/newsletter/subscribe', { email })
                    setSubscribeMsg('تم الاشتراك بنجاح')
                    setEmail('')
                    trackPerformance('newsletter_subscribe', performance.now() - start, 'ms')
                  } catch {
                    setSubscribeMsg('فشل الاشتراك')
                    trackError('subscription_error', 'Subscription failed')
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                {submitting ? 'جاري الاشتراك…' : 'اشترك'}
              </Button>
            </div>
            <div className="newsletter-privacy-note" style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#4a4a4a' }}>
              نُقدّر خصوصيتك؛ سيُستخدم بريدك الإلكتروني فقط لإرسال التحديثات.
            </div>
            {subscribeMsg && <div aria-live="polite" style={{ marginTop: '0.75rem' }}>{subscribeMsg}</div>}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
