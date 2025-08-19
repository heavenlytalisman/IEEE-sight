import React from 'react';
import { motion } from 'framer-motion';
import { MdMailOutline } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import './Executive.scss';

// Example member data; expand as needed
const members = [
  {
    id: 'chair',
    name: 'Dr. John Doe',
    position: 'Chapter Chair',
    credentials: 'IEEE Senior Member',
    email: 'chair@ieee-sight.org',
    bio: 'Leading humanitarian technology initiatives with 8+ years of experience.',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    image: null // Provide an image URL or null for placeholder
  },
  {
    id: 'vice-chair',
    name: 'Jane Smith',
    position: 'Vice Chair',
    credentials: 'IEEE Member',
    email: 'vicechair@ieee-sight.org',
    bio: 'Specializing in community outreach and sustainable development projects.',
    linkedin: 'https://www.linkedin.com/in/janesmith',
    image: null
  },
  {
    id: 'secretary',
    name: 'Mike Johnson',
    position: 'Secretary',
    credentials: 'IEEE Student Member',
    email: 'secretary@ieee-sight.org',
    bio: 'Coordinating chapter activities and maintaining member engagement.',
    linkedin: 'https://www.linkedin.com/in/mikejohnson',
    image: null
  }
];

const Executive = () => {
  const handleContactClick = (email, memberName) => {
    const subject = encodeURIComponent(`IEEE SIGHT Inquiry - ${memberName}`);
    window.open(`mailto:${email}?subject=${subject}`, '_blank');
  };

  const handleLinkedInClick = (linkedinUrl) => {
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="Execom" className="section alt">
      <div className="container">
        <div className="section-header">
          <h2>Execom</h2>
          <p className="section-subtitle">
            Dedicated leaders driving our humanitarian technology mission
          </p>
        </div>
        <div className="members-grid">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              className="member-card interactive-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,98,155,0.13)' }}
              transition={{
                duration: 0.65,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: idx * 0.08
              }}
              tabIndex={0}
              aria-label={`Executive member: ${member.name}`}
            >
              <div className="member-photo">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div className="photo-placeholder" aria-label="Photo placeholder">
                    {member.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                    }
                  </div>
                )}
                <motion.div
                  className="member-overlay"
                  initial={{ opacity: 0 }}  // Explicitly set to 0 initially
                  whileHover={{ opacity: 1 }}
                  whileFocus={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    className="contact-btn"
                    type="button"
                    aria-label={`Email ${member.name}`}
                    title={`Email ${member.name}`}
                    onClick={() => handleContactClick(member.email, member.name)}
                  >
                    <MdMailOutline />
                  </button>
                  <button
                    className="linkedin-btn"
                    type="button"
                    aria-label={`${member.name}'s LinkedIn`}
                    title="LinkedIn Profile"
                    onClick={() => handleLinkedInClick(member.linkedin)}
                  >
                    <FaLinkedin />
                  </button>
                </motion.div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Executive;
