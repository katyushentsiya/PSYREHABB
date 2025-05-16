import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import OurServices from './components/Services/OurServices';
import AboutUs from './components/About/AboutUs';

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {

        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [location.hash]); 

  return (
    <>
      <Home />
      <OurServices />
      <AboutUs />
    </>
  );
};

export default MainPage;

