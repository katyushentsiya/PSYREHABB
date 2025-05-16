import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

import MainPage from './MainPage';
import ServicesPage from './components/Services/ServicesPage';
import RegistPage from './components/LoginForm/RegistPage';
import PersonalAreaPage from './components/PersonalAreaPage/PersonalAreaPage';
import DiaryEmotionsPage from './components/DiaryEmotionsPage/DiaryEmotionsPage';
import ForumPage from './components/ForumPage/ForumPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header /> 

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistPage />} />
            <Route path="/personal-area" element={<PersonalAreaPage />} />
            <Route path="/diary" element={<DiaryEmotionsPage />} />
            <Route path="/forum" element={<ForumPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

