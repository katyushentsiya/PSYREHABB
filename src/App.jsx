import React, { useState } from 'react'; // Додаємо useState
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
import TestingPage from './components/TestingPage/TestingPage';
import MaterialsPage from './components/MaterialsPage/MaterialsPage';
import initialForumStoriesData from './components/ForumPage/forumStoriesData';

import './App.css';

function App() {
    // Стан для зберігання історій форуму, який буде оновлюватися зі щоденника
  const [forumStories, setForumStories] = useState(initialForumStoriesData);

  // Функція для додавання нової історії
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

            <Route
              path="/diary"
              element={<DiaryEmotionsPage addStoryToForum={addStoryToForum} />}
            />

            <Route
              path="/forum"
              element={<ForumPage forumStories={forumStories} />}
            />

            <Route path="/testing" element={<TestingPage />} />

            <Route path='/library' element={<MaterialsPage />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

