import React, { useState } from 'react';
import './About.scss';

const About = () => {
  const [activeTab, setActiveTab] = useState('chapter');

  const globalStats = [
    { number: '200+', label: 'Global Chapters' },
    { number: '10,000+', label: 'Active Members' },
    { number: '50+', label: 'Countries' }
  ];

  const objectives = [
    {
      icon: '🎯',
      title: 'Promote Humanitarian Technology',
      description: 'Advance humanitarian technology activities and sustainable development initiatives'
    },
    {
      icon: '📈',
      title: 'Increase Awareness',
      description: 'Raise awareness of technology\'s potential to improve living standards globally'
    },
    {
      icon: '🤝',
      title: 'Community Engagement',
      description: 'Partner with NGOs, civil society organizations, and corporate entities'
    },
    {
      icon: '🌐',
      title: 'Global Collaboration',
      description: 'Work with international engineering community bodies and institutions'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2>About IEEE SIGHT</h2>
          <p className="section-subtitle">
            The Special Interest Group on Humanitarian Technology connects IEEE volunteers globally
          </p>
        </div>

        <div className="tabs-container reveal-up">
          <div className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'chapter' ? 'active' : ''}`}
              onClick={() => setActiveTab('chapter')}
              data-tab="chapter"
            >
              About Our IEEE SIGHT Chapter
            </button>
            <button 
              className={`tab-btn ${activeTab === 'global' ? 'active' : ''}`}
              onClick={() => setActiveTab('global')}
              data-tab="global"
            >
              About IEEE SIGHT Globally
            </button>
          </div>

          <div className="tabs-content">
            <div className={`tab-pane ${activeTab === 'chapter' ? 'active' : ''}`} id="chapter">
              <div className="about-grid">
                <div>
                  <p>
                    IEEE SIGHT groups consist of at least six IEEE members who come together to learn about sustainable development, foster relationships with their local communities, and leverage technology to address key issues.
                  </p>

                  <div className="highlight-box">
                    <h4>Our Focus Areas</h4>
                    <ul>
                      <li>Digital Education Platforms</li>
                      <li>Healthcare Technology Access</li>
                      <li>Environmental Monitoring Systems</li>
                      <li>Community Development Tools</li>
                    </ul>
                  </div>
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

            <div className={`tab-pane ${activeTab === 'global' ? 'active' : ''}`} id="global">
              <div>
                <p>
                  IEEE SIGHT is a global network that connects IEEE volunteers interested in applying technical skills to humanitarian challenges.
                </p>

                <div className="global-stats">
                  {globalStats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <span className="number">{stat.number}</span>
                      <span className="label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="objectives-grid">
                  {objectives.map((objective, index) => (
                    <div key={index} className="objective-card">
                      <div className="objective-icon">{objective.icon}</div>
                      <h4>{objective.title}</h4>
                      <p>{objective.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
