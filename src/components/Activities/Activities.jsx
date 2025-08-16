import React, { useState } from 'react';
import './Activities.scss';

const Activities = () => {
  const [activeFilter, setActiveFilter] = useState('all');

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
      image: null
    }
  ];

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === activeFilter);

  return (
    <section id="activities" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Activities & Events</h2>
          <p className="section-subtitle">
            Our humanitarian technology initiatives and community programs
          </p>
        </div>

        <div className="activity-filters reveal-up">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              data-filter={filter.id}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="activities-grid reveal-up delay-1">
          {filteredActivities.map(activity => (
            <div 
              key={activity.id} 
              className="activity-card"
              data-category={activity.category}
            >
              <div className="activity-image">
                <div style={{
                  background: 'var(--background-alt)', 
                  height: '200px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}>
                  Event Image
                </div>
                <div className={`activity-badge ${activity.status}`}>
                  {activity.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </div>
                <div className="activity-overlay">
                  <button className="expand-btn">View Details</button>
                </div>
              </div>
              <div className="activity-content">
                <div className="activity-meta">
                  <span className="activity-date">{activity.date}</span>
                  <span className="activity-type">{activity.type}</span>
                </div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div className="activity-details">
                  <div className="activity-stats">
                    {activity.stats.map((stat, index) => (
                      <span key={index} className="stat">
                        {index === 0 ? '👥' : index === 1 ? '⏱️' : '📍'} {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
