import React, { useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import LoadingScreen from './components/UI/LoadingScreen/LoadingScreen';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Executive from './components/Executive/Executive';
import Activities from './components/Activities/Activities';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  useEffect(() => {
    document.body.style.overflow = '';
    
    const initializeAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
        observer.observe(el);
      });
    };

    setTimeout(initializeAnimations, 1000);
  }, []);

  return (
    <div className="App">
      <LoadingScreen />
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <About />
        <Executive />
        <Activities />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
