import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa';
import { HiUsers, HiGlobeAlt, HiHeart } from 'react-icons/hi';
import './Achievements.scss';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      year: '2024',
      type: 'Award',
      title: 'IEEE SIGHT Outstanding Chapter Award',
      description: 'Recognized globally as the outstanding IEEE SIGHT chapter for exceptional community engagement and humanitarian impact.',
      stats: ['95% Impact Score', '3 Countries', '500+ Lives'],
      icon: FaTrophy,
      color: '#EAB308',
      image: null
    },
    {
      id: 2,
      year: '2023',
      type: 'Recognition',
      title: 'Community Technology Innovation Award',
      description: 'Awarded for developing sustainable technology solutions that directly benefited underserved communities in rural areas.',
      stats: ['10 Projects', '5 Villages', '200+ Families'],
      icon: FaAward,
      color: '#059669',
      image: null
    },
    {
      id: 3,
      year: '2022',
      type: 'Achievement',
      title: 'Student Chapter Excellence Medal',
      description: 'Recognized for outstanding student leadership and innovative humanitarian technology programs.',
      stats: ['50+ Students', '8 Programs', '100% Success'],
      icon: FaMedal,
      color: '#DC2626',
      image: null
    }
  ];

  const getStatIcon = (statText) => {
    if (statText.includes('Countries') || statText.includes('Villages')) {
      return <HiGlobeAlt />;
    } else if (statText.includes('Lives') || statText.includes('Families')) {
      return <HiHeart />;
    } else {
      return <HiUsers />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="achievements" className="section alt">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Achievements</h2>
          <p className="section-subtitle">
            Recognition and impact of our humanitarian technology efforts
          </p>
        </motion.div>

        <motion.div 
          className="achievements-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div 
                key={achievement.id} 
                className="timeline-item"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                tabIndex={0}
                aria-label={`Achievement: ${achievement.title} from ${achievement.year}`}
              >
                <motion.div 
                  className="timeline-marker"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {achievement.year}
                </motion.div>

                <div className="achievement-card">
                  <div className="achievement-image">
                    <div 
                      className="image-placeholder"
                      style={{ 
                        background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}40)`
                      }}
                    >
                      <IconComponent 
                        size={64} 
                        color={achievement.color}
                        style={{ opacity: 0.8 }}
                      />
                    </div>
                    
                    <motion.div 
                      className="achievement-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <IconComponent size={16} />
                      {achievement.type}
                    </motion.div>
                  </div>

                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    
                    <div className="achievement-stats">
                      {achievement.stats.map((stat, statIndex) => (
                        <motion.span 
                          key={statIndex} 
                          className="stat"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + statIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="stat-icon">
                            {getStatIcon(stat)}
                          </span>
                          {stat}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
