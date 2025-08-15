import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">IEEE Sight</h1>
          <p className="hero-subtitle">
            {/* Copy your main tagline from backup/index.html */}
            Advancing Technology for Humanity
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Additional sections - copy content from your backup/index.html */}
      <section className="about-section">
        <div className="container">
          <h2>About IEEE Sight</h2>
          <p>
            {/* Copy content from your original HTML */}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
