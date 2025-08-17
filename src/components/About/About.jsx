// src/components/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import './About.scss';
import {
  FaGlobe, FaUsers, FaMapMarkedAlt,
  FaBullseye, FaHandsHelping,
  FaChartLine, FaNetworkWired
} from 'react-icons/fa';

const statData = [
  { icon: <FaGlobe />, number: '200+', label: 'Chapters' },
  { icon: <FaUsers />, number: '10 000+', label: 'Volunteers' },
  { icon: <FaMapMarkedAlt />, number: '50+', label: 'Countries' },
];

const objectives = [
  {
    icon: <FaBullseye />,
    title: 'Promote Humanitarian Tech',
    description: 'Run workshops and hackathons tackling local sustainability challenges.',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Community Partnerships',
    description: 'Deploy low-cost tech with NGOs, healthcare providers, and schools.',
  },
  {
    icon: <FaChartLine />,
    title: 'Impact Measurement',
    description: 'Track engagement, deployment, and satisfaction in an annual report.',
  },
  {
    icon: <FaNetworkWired />,
    title: 'Global Network',
    description: 'Connect chapters via an online platform for resource sharing.',
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState('chapter');
  const [sectionVisible, setSectionVisible] = useState(false);
  const iconRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.8) {
        setSectionVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    iconRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [sectionVisible]);

  return (
    <>
      <svg className="divider-top" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 C360,20 1080,100 1440,60 L1440,0 L0,0 Z"
              fill="none" stroke="var(--primary-color)" strokeWidth="1" opacity="0.3" />
      </svg>

      <section
        id="about"
        ref={sectionRef}
        className={`section reveal-up${sectionVisible ? ' visible' : ''}`}
        aria-labelledby="about-heading"
      >
        <div className="container">
          <header className="section-header">
            <h2 id="about-heading">About IEEE SIGHT</h2>
            <p className="section-subtitle">
              IEEE’s Special Interest Group on Humanitarian Technology empowers volunteers
              worldwide to solve pressing global issues with scalable, sustainable solutions.
            </p>
          </header>

          <nav className="tabs-nav" role="tablist" aria-label="About SIGHT">
            <button
              role="tab"
              aria-selected={activeTab === 'chapter'}
              aria-controls="pane-chapter"
              id="tab-chapter"
              className={`tab-btn${activeTab === 'chapter' ? ' active' : ''}`}
              onClick={() => setActiveTab('chapter')}
            >
              Local Chapter
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'global'}
              aria-controls="pane-global"
              id="tab-global"
              className={`tab-btn${activeTab === 'global' ? ' active' : ''}`}
              onClick={() => setActiveTab('global')}
            >
              Global Network
            </button>
          </nav>

          <div className="tabs-content">
            {/* Local Chapter Pane */}
            <article
              id="pane-chapter"
              role="tabpanel"
              aria-labelledby="tab-chapter"
              className={`tab-pane${activeTab === 'chapter' ? ' active' : ''}`}
            >
              <div className="about-grid">
                <div>
                  <h3>Our Chapter Model</h3>
                  <p>
                    Each local IEEE SIGHT chapter is powered by a core team of six or more members.
                    Quarterly initiatives include tech-for-good workshops, coding clinics,
                    and awareness seminars tailored to community needs.
                  </p>

                  <div className="highlight-box">
                    <h4>Focus Areas</h4>
                    <ul>
                      <li>Digital Literacy & E-Learning</li>
                      <li>Affordable Healthcare Devices</li>
                      <li>Environmental Sensing & Monitoring</li>
                      <li>Civic Tech & Community Tools</li>
                    </ul>
                  </div>
                </div>

                <div className="impact-metrics">
                  {[{
                    icon: '🗣️',
                    number: '85%',
                    label: 'Member Retention'
                  },{
                    icon: '🔧',
                    number: '70%',
                    label: 'Projects Deployed'
                  }].map((m, i) => (
                    <div key={i} className="metric-card" tabIndex="0">
                      <div className="metric-icon">{m.icon}</div>
                      <div>
                        <span className="metric-number">{m.number}</span>
                        <span className="metric-label">{m.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Global Network Pane */}
            <article
              id="pane-global"
              role="tabpanel"
              aria-labelledby="tab-global"
              className={`tab-pane${activeTab === 'global' ? ' active' : ''}`}
            >
              <div className="global-stats">
                {statData.map((s, i) => (
                  <div key={i} className="stat-item" tabIndex="0">
                    <span className="number">{s.number}</span>
                    <span className="label">{s.label}</span>
                    <span
                      className="stat-icon icon-wrap"
                      ref={el => (iconRefs.current[i] = el)}
                    >
                      {s.icon}
                    </span>
                  </div>
                ))}
              </div>

              <div className="objectives-grid">
                {objectives.map((o, i) => (
                  <div key={i} className="objective-card" tabIndex="0">
                    <span
                      className="objective-icon icon-wrap"
                      ref={el => (iconRefs.current[statData.length + i] = el)}
                    >
                      {o.icon}
                    </span>
                    <h4>{o.title}</h4>
                    <p>{o.description}</p>
                  </div>
                ))}
              </div>
            </article>
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
