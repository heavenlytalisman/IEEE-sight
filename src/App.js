import React, { useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import LoadingScreen from './components/UI/LoadingScreen/LoadingScreen';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import './App.scss';

function App() {
  useEffect(() => {
    // Force enable scrolling
    document.body.style.overflow = '';
    
    // Initialize animation observers
    const initializeAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
        observer.observe(el);
      });
    };

    setTimeout(initializeAnimations, 1000);
  }, []);

  return (
    <div className="App">
      <LoadingScreen />
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        
        {/* Add temporary content sections to test scrolling */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header">
              <h2>About IEEE SIGHT</h2>
              <p className="section-subtitle">
                The Special Interest Group on Humanitarian Technology connects IEEE volunteers globally
              </p>
            </div>
            <div className="reveal-up">
              <p>IEEE SIGHT groups consist of at least six IEEE members who come together to learn about sustainable development, foster relationships with their local communities, and leverage technology to address key issues.</p>
              
              <div className="about-grid">
                <div>
                  <h3>Our Focus Areas</h3>
                  <ul>
                    <li>Digital Education Platforms</li>
                    <li>Healthcare Technology Access</li>
                    <li>Environmental Monitoring Systems</li>
                    <li>Community Development Tools</li>
                  </ul>
                </div>
                <div className="impact-metrics">
                  <div className="metric-card">
                    <div className="metric-icon">📊</div>
                    <div>
                      <span className="metric-number">85%</span>
                      <span className="metric-label">Community Engagement</span>
                    </div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon">🔧</div>
                    <div>
                      <span className="metric-number">70%</span>
                      <span className="metric-label">Tech Solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="committee" className="section alt">
          <div className="container">
            <div className="section-header">
              <h2>Executive Committee</h2>
              <p className="section-subtitle">
                Dedicated leaders driving our humanitarian technology mission
              </p>
            </div>
            <div className="members-grid reveal-up">
              <div className="member-card">
                <div className="member-photo">
                  <div style={{background: '#f0f0f0', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Photo Placeholder
                  </div>
                </div>
                <div className="member-info">
                  <h3>Dr. John Doe</h3>
                  <div className="position">Chapter Chair</div>
                  <div className="credentials">IEEE Senior Member</div>
                  <div className="contact">chair@ieee-sight.org</div>
                  <div className="member-bio">
                    <p>Leading humanitarian technology initiatives with 8+ years of experience.</p>
                  </div>
                </div>
              </div>

              <div className="member-card">
                <div className="member-photo">
                  <div style={{background: '#f0f0f0', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Photo Placeholder
                  </div>
                </div>
                <div className="member-info">
                  <h3>Jane Smith</h3>
                  <div className="position">Vice Chair</div>
                  <div className="credentials">IEEE Member</div>
                  <div className="contact">vicechair@ieee-sight.org</div>
                  <div className="member-bio">
                    <p>Specializing in community outreach and sustainable development projects.</p>
                  </div>
                </div>
              </div>

              <div className="member-card">
                <div className="member-photo">
                  <div style={{background: '#f0f0f0', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Photo Placeholder
                  </div>
                </div>
                <div className="member-info">
                  <h3>Mike Johnson</h3>
                  <div className="position">Secretary</div>
                  <div className="credentials">IEEE Student Member</div>
                  <div className="contact">secretary@ieee-sight.org</div>
                  <div className="member-bio">
                    <p>Coordinating chapter activities and maintaining member engagement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="activities" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Activities & Events</h2>
              <p className="section-subtitle">
                Our humanitarian technology initiatives and community programs
              </p>
            </div>
            <div className="activities-grid reveal-up">
              <div className="activity-card">
                <div className="activity-image">
                  <div style={{background: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Event Image
                  </div>
                  <div className="activity-badge upcoming">Upcoming</div>
                </div>
                <div className="activity-content">
                  <div className="activity-meta">
                    <span className="activity-date">April 28, 2025</span>
                    <span className="activity-type">Workshop</span>
                  </div>
                  <h3>AI for Social Good Workshop</h3>
                  <p>Hands-on workshop covering artificial intelligence applications in humanitarian technology.</p>
                  <div className="activity-details">
                    <div className="activity-stats">
                      <span className="stat">👥 50+ Expected</span>
                      <span className="stat">⏱️ 6 Hours</span>
                      <span className="stat">📍 Virtual</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="activity-card">
                <div className="activity-image">
                  <div style={{background: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Event Image
                  </div>
                  <div className="activity-badge past">Completed</div>
                </div>
                <div className="activity-content">
                  <div className="activity-meta">
                    <span className="activity-date">November 15, 2024</span>
                    <span className="activity-type">Competition</span>
                  </div>
                  <h3>Humanitarian Code Challenge</h3>
                  <p>48-hour coding competition focused on developing solutions for humanitarian challenges.</p>
                  <div className="activity-details">
                    <div className="activity-stats">
                      <span className="stat">👥 120 Participants</span>
                      <span className="stat">⏱️ 48 Hours</span>
                      <span className="stat">🏆 15 Teams</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container">
            <div className="section-header">
              <h2>Get In Touch</h2>
              <p className="section-subtitle">
                Connect with us to join our humanitarian technology mission
              </p>
            </div>
            <div className="contact-content reveal-up">
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
      </main>
    </div>
  );
}

export default App;
