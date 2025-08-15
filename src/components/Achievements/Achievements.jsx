import React from 'react';
import './Achievements.scss';

const Achievements = () => {
  const achievements = [
    {
      year: '2024',
      type: 'Award',
      title: 'IEEE SIGHT Outstanding Chapter Award',
      description: 'Recognized globally as the outstanding IEEE SIGHT chapter for exceptional community engagement and humanitarian impact.',
      stats: ['95% Impact Score', '3 Countries', '500+ Lives']
    }
    // Add more achievements here
  ];

  return (
    <section id="achievements" className="section alt">
      <div className="container">
        <div className="section-header">
          <h2>Our Achievements</h2>
          <p className="section-subtitle">
            Recognition and impact of our humanitarian technology efforts
          </p>
        </div>

        <div className="achievements-timeline reveal-up">
          {achievements.map((achievement, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                {achievement.year}
              </div>
              <div className="achievement-card">
                <div className="achievement-image">
                  <div style={{
                    background: 'var(--background-alt)', 
                    height: '200px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}>
                    Achievement Image
                  </div>
                  <div className="achievement-badge">
                    🏆 {achievement.type}
                  </div>
                </div>
                <div className="achievement-content">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  <div className="achievement-stats">
                    {achievement.stats.map((stat, statIndex) => (
                      <span key={statIndex} className="stat">{stat}</span>
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

export default Achievements;
