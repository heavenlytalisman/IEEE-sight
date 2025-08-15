import React from 'react';
import './Executive.scss';

const Executive = () => {
  const members = [
    {
      id: 'chair',
      name: 'Dr. John Doe',
      position: 'Chapter Chair',
      credentials: 'IEEE Senior Member',
      email: 'chair@ieee-sight.org',
      bio: 'Leading humanitarian technology initiatives with 8+ years of experience.',
      image: null // Will be placeholder for now
    },
    {
      id: 'vice-chair',
      name: 'Jane Smith',
      position: 'Vice Chair',
      credentials: 'IEEE Member',
      email: 'vicechair@ieee-sight.org',
      bio: 'Specializing in community outreach and sustainable development projects.',
      image: null
    },
    {
      id: 'secretary',
      name: 'Mike Johnson',
      position: 'Secretary',
      credentials: 'IEEE Student Member',
      email: 'secretary@ieee-sight.org',
      bio: 'Coordinating chapter activities and maintaining member engagement.',
      image: null
    }
  ];

  const handleContactClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleLinkedInClick = (member) => {
    // Placeholder for LinkedIn functionality
    console.log(`Opening LinkedIn for ${member.name}`);
  };

  return (
    <section id="committee" className="section alt">
      <div className="container">
        <div className="section-header">
          <h2>Executive Committee</h2>
          <p className="section-subtitle">
            Dedicated leaders driving our humanitarian technology mission
          </p>
        </div>

        <div className="members-grid reveal-up">
          {members.map(member => (
            <div key={member.id} className="member-card interactive-card" data-member={member.id}>
              <div className="member-photo">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div className="photo-placeholder">
                    Photo Placeholder
                  </div>
                )}
                <div className="member-overlay">
                  <button 
                    className="contact-btn"
                    onClick={() => handleContactClick(member.email)}
                    title="Send Email"
                  >
                    ✉️
                  </button>
                  <button 
                    className="linkedin-btn"
                    onClick={() => handleLinkedInClick(member)}
                    title="LinkedIn Profile"
                  >
                    💼
                  </button>
                </div>
              </div>
              
              <div className="member-info">
                <h3>{member.name}</h3>
                <div className="position">{member.position}</div>
                <div className="credentials">{member.credentials}</div>
                <div className="contact">{member.email}</div>
                <div className="member-bio">
                  <p>{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Executive;
