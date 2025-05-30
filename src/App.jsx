import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Додаємо Navigate

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'; // Здається, не використовується як окремий маршрут
import MainPage from './MainPage'; // Головна сторінка
import ServicesPage from './components/Services/ServicesPage';
import RegistPage from './components/LoginForm/RegistPage';
// PersonalAreaPage, DiaryEmotionsPage, ForumPage, TestingPage, MaterialsPage будуть захищені
import PersonalAreaPage from './components/PersonalAreaPage/PersonalAreaPage';
import DiaryEmotionsPage from './components/DiaryEmotionsPage/DiaryEmotionsPage';
import ForumPage from './components/ForumPage/ForumPage';
import TestingPage from './components/TestingPage/TestingPage';
import MaterialsPage from './components/MaterialsPage/MaterialsPage';
import initialForumStoriesData from './components/ForumPage/forumStoriesData';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';  // Імпортуємо ProtectedRoute

import './App.css';

function App() {
  const [forumStories, setForumStories] = useState(initialForumStoriesData);

  const addStoryToForum = (newStory) => {
    setForumStories(prevStories => [
      {
        ...newStory,
        id: prevStories.length > 0 ? Math.max(...prevStories.map(s => s.id)) + 1 : 1, // Простий ID
        likes: 0,
        comments: 0,
        author: JSON.parse(localStorage.getItem('loggedInUser')) || { login: 'Анонім', profileImage: '/default-user.jpg', email: '' } // Автор з поточного користувача
      },
      ...prevStories, // Додаємо нову історію на початок
    ]);
  };

  return (
    <Router basename="/PSYREHABB">
      <div className="app">
        <Header />

        <main className="main-content">
          <Routes>
            {/* Публічні маршрути */}
            <Route path="/" element={<MainPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/" element={<Home />} />
             * Залиште лише один, або якщо Home - це окрема сторінка, дайте їй унікальний шлях, наприклад '/home'.
             * Я залишаю MainPage, оскільки вона перша і, ймовірно, є вашою фактичною "головною". */}
            <Route path="/register" element={<RegistPage />} />

            {/* ЗАХИЩЕНІ МАРШРУТИ - обгортаємо їх у ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="/personal-area" element={<PersonalAreaPage />} />
              <Route
                path="/diary"
                element={<DiaryEmotionsPage addStoryToForum={addStoryToForum} />}
              />
              <Route
                path="/forum"
                element={<ForumPage forumStories={forumStories} />}
              />
              <Route path="/testing" element={<TestingPage />} />
              <Route path="/library" element={<MaterialsPage />} />
            </Route>

            {/* Маршрут-заглушка для 404 помилок */}
            <Route path="*" element={
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>404 - Сторінка не знайдена</h2>
                    <p>Перевірте URL або поверніться на <a href="/PSYREHABB">головну</a>.</p>
                </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;