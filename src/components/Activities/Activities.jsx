import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUsers, HiClock, HiLocationMarker, HiEye } from 'react-icons/hi';
import { FaFilter } from 'react-icons/fa';
import './Activities.scss';

const Activities = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterKey, setFilterKey] = useState(0);

  const filters = [
    { id: 'all', label: 'All Activities' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'competition', label: 'Competitions' },
    { id: 'seminar', label: 'Seminars' }
  ];

  const activities = [
    {
      id: 1,
      category: 'workshop',
      title: 'AI for Social Good Workshop',
      description: 'Hands-on workshop covering artificial intelligence applications in humanitarian technology.',
      date: 'April 28, 2025',
      type: 'Workshop',
      status: 'upcoming',
      stats: ['50+ Expected', '6 Hours', 'Virtual'],
      color: '#2563eb',
      image: null
    },
    {
      id: 2,
      category: 'competition',
      title: 'Humanitarian Code Challenge',
      description: '48-hour coding competition focused on developing solutions for humanitarian challenges.',
      date: 'November 15, 2024',
      type: 'Competition',
      status: 'past',
      stats: ['120 Participants', '48 Hours', '15 Teams'],
      color: '#16a34a',
      image: null
    },
    {
      id: 3,
      category: 'workshop',
      title: 'AAAI-25 Workshops: AI for Social Impact',
      description: 'Academic workshop bridging innovations in AI for finance, social media, crime prevention, and education.',
      date: 'March 3-4, 2025',
      type: 'Workshop',
      status: 'upcoming',
      stats: ['100+ Expected', '2 Days', 'USA'],
      color: '#f59e0b',
      image: null
    },
    {
      id: 4,
      category: 'competition',
      title: 'National Level Coding Competition Finals',
      description: 'Finals of national competition for young coders. Advanced Python & block-based coding challenges.',
      date: 'November 2025',
      type: 'Competition',
      status: 'upcoming',
      stats: ['100+ Finalists', '2 Days', 'Bangalore'],
      color: '#7c3aed',
      image: null
    },
    {
      id: 5,
      category: 'seminar',
      title: 'IEEE International Conference on Innovate for Humanitarian',
      description: 'Conference on technology solutions for global humanitarian challenges. AI, sustainability, disaster resilience, and more.',
      date: 'November 21-22, 2025',
      type: 'Seminar',
      status: 'upcoming',
      stats: ['Global', 'Hybrid', 'Indore, India'],
      color: '#ea580c',
      image: null
    }
  ];

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === activeFilter);

  const getStatIcon = (index) => {
    switch (index) {
      case 0: return <HiUsers />;
      case 1: return <HiClock />;
      case 2: return <HiLocationMarker />;
      default: return <HiUsers />;
    }
  };

  const handleViewDetails = (activity) => {
    console.log('View details for:', activity.title);
    // Add modal or navigation logic here
  };

  const handleFilterChange = (filterId) => {
    if (filterId !== activeFilter) {
      setActiveFilter(filterId);
      setFilterKey(prev => prev + 1);
    }
  };

  return (
    <section id="activities" className="section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2>Activities & Events</h2>
          <p className="section-subtitle">
            Our humanitarian technology initiatives and community programs
          </p>
        </motion.div>

        <motion.div 
          className="activity-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="filter-icon">
            <FaFilter />
          </div>
          {filters.map(filter => (
            <motion.button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="activities-grid">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeFilter}-${filterKey}`}
              className="grid-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={`${activity.id}-${filterKey}`}
                  className="activity-card"
                  data-category={activity.category}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  layout
                  tabIndex={0}
                  aria-label={`Activity: ${activity.title}`}
                >
                  <div className="activity-image">
                    <div 
                      className="image-placeholder"
                      style={{ 
                        background: `linear-gradient(135deg, ${activity.color}20, ${activity.color}40)`
                      }}
                    >
                      <div className="placeholder-icon" style={{ color: activity.color }}>
                        {activity.type.charAt(0)}
                      </div>
                    </div>
                    
                    <motion.div 
                      className={`activity-badge ${activity.status}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 + index * 0.025 }}
                    >
                      {activity.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </motion.div>
                    
                    <motion.div 
                      className="activity-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      style={{ pointerEvents: 'none' }}
                      whileInView={{ pointerEvents: 'auto' }}
                    >
                      <button 
                        className="expand-btn"
                        onClick={() => handleViewDetails(activity)}
                        aria-label={`View details for ${activity.title}`}
                      >
                        <HiEye />
                        <span>View Details</span>
                      </button>
                    </motion.div>
                  </div>
                  
                  <div className="activity-content">
                    <div className="activity-meta">
                      <span className="activity-date">{activity.date}</span>
                      <span 
                        className="activity-type"
                        style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
                      >
                        {activity.type}
                      </span>
                    </div>
                    
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    
                    <div className="activity-stats">
                      {activity.stats.map((stat, index) => (
                        <motion.span 
                          key={index} 
                          className="stat"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          <span className="stat-icon">
                            {getStatIcon(index)}
                          </span>
                          {stat}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Activities;
