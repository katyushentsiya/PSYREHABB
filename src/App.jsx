import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Додаємо Outlet
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'; 
import MainPage from './MainPage'; 
import ServicesPage from './components/Services/ServicesPage';
import RegistPage from './components/LoginForm/RegistPage';
import PersonalAreaPage from './components/PersonalAreaPage/PersonalAreaPage';
import DiaryEmotionsPage from './components/DiaryEmotionsPage/DiaryEmotionsPage';
import ForumPage from './components/ForumPage/ForumPage';
import TestingPage from './components/TestingPage/TestingPage';
import MaterialsPage from './components/MaterialsPage/MaterialsPage';
import initialForumStoriesData from './components/ForumPage/forumStoriesData';


import './App.css';

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('loggedInUser'); 

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />; 
  }

  return <Outlet />;
};

function App() {
  const [forumStories, setForumStories] = useState(initialForumStoriesData);

  const addStoryToForum = (newStory) => {
    setForumStories(prevStories => [
      {
        ...newStory,
        id: prevStories.length > 0 ? Math.max(...prevStories.map(s => s.id)) + 1 : 1, 
        likes: 0,
        comments: 0,
        author: JSON.parse(localStorage.getItem('loggedInUser')) || { login: 'Анонім', profileImage: '/default-user.jpg', email: '' } 
      },
      ...prevStories,
    ]);
  };

  return (
    <Router basename="/PSYREHABB">
      <div className="app">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<RegistPage />} />

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