import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGlobe, FaUsers, FaMapMarkedAlt,
  FaBullseye, FaHandsHelping,
  FaChartLine, FaNetworkWired
} from 'react-icons/fa';
import './About.scss';

const statData = [
  { icon: <FaGlobe />, number: '200+', label: 'Chapters' },
  { icon: <FaUsers />, number: '10,000+', label: 'Volunteers' },
  { icon: <FaMapMarkedAlt />, number: '50+', label: 'Countries' },
];

const objectives = [
  {
    icon: <FaBullseye />,
    title: 'Promote Humanitarian Tech',
    description: 'Workshops and hackathons for sustainable local impact.',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Community Partnerships',
    description: 'Collaboration with NGOs, healthcare providers, schools.',
  },
  {
    icon: <FaChartLine />,
    title: 'Impact Measurement',
    description: 'Track engagement and deployment in annual reports.',
  },
  {
    icon: <FaNetworkWired />,
    title: 'Global Network',
    description: 'Connect chapters for resource sharing worldwide.',
  },
];

const metrics = [
  { icon: <FaUsers />, number: '85%', label: 'Member Retention' },
  { icon: <FaChartLine />, number: '70%', label: 'Projects Deployed' }
];

const tabs = [
  { id: 'chapter', label: 'Local Chapter' },
  { id: 'global', label: 'Global Network' },
];

const About = () => {
  const [activeTab, setActiveTab] = useState('chapter');

  return (
    <>
      <svg className="divider-top" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 C360,20 1080,100 1440,60 L1440,0 L0,0 Z"
          fill="none" stroke="var(--primary-color)" strokeWidth="1" opacity="0.3" />
      </svg>

      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <motion.header 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="about-heading">About IEEE SIGHT</h2>
            <p className="section-subtitle">
              IEEE’s Special Interest Group on Humanitarian Technology empowers volunteers worldwide to solve global issues with scalable, sustainable solutions.
            </p>
          </motion.header>

          <nav className="tabs-nav" role="tablist" aria-label="About SIGHT">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`pane-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </nav>

          <div className="tabs-content">
            <AnimatePresence mode="wait" initial={false}>
              {activeTab === 'chapter' && (
                <motion.article
                  key="chapter"
                  id="pane-chapter"
                  role="tabpanel"
                  aria-labelledby="tab-chapter"
                  className="tab-pane active"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="about-grid">
                    <div>
                      <h3>Our Chapter Model</h3>
                      <p>
                        Each local IEEE SIGHT chapter is powered by a core team of six or more members. Quarterly initiatives include tech-for-good workshops, coding clinics, and awareness seminars tailored to community needs.
                      </p>
                      <motion.div 
                        className="highlight-box"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <h4>Focus Areas</h4>
                        <ul>
                          <li>Digital Literacy & E-Learning</li>
                          <li>Affordable Healthcare Devices</li>
                          <li>Environmental Sensing & Monitoring</li>
                          <li>Civic Tech & Community Tools</li>
                        </ul>
                      </motion.div>
                    </div>

                    <div className="impact-metrics">
                      {metrics.map((m, i) => (
                        <motion.div
                          key={i}
                          className="metric-card"
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        >
                          <div className="metric-icon" aria-hidden="true">{m.icon}</div>
                          <div>
                            <span className="metric-number">{m.number}</span>
                            <span className="metric-label">{m.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )}
              {activeTab === 'global' && (
                <motion.article
                  key="global"
                  id="pane-global"
                  role="tabpanel"
                  aria-labelledby="tab-global"
                  className="tab-pane active"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="global-stats">
                    {statData.map((s, i) => (
                      <motion.div
                        key={i}
                        className="stat-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.45 }}
                      >
                        <span className="number">{s.number}</span>
                        <span className="label">{s.label}</span>
                        <span className="stat-icon">{s.icon}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="objectives-grid">
                    {objectives.map((o, i) => (
                      <motion.div
                        key={i}
                        className="objective-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.12, duration: 0.52 }}
                        tabIndex={0}
                      >
                        <span className="objective-icon">{o.icon}</span>
                        <h4>{o.title}</h4>
                        <p>{o.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <svg className="divider-bottom" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 C360,40 1080,-40 1440,0 L1440,60 L0,60 Z"
          fill="none" stroke="var(--primary-color)" strokeWidth="1" opacity="0.3" />
      </svg>
    </>
  );
};

export default About;
