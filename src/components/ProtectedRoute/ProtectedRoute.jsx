// src/components/ProtectedRoute/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation(); // location не використовується в поточній логіці, можна прибрати якщо не знадобиться

  // Цей useEffect запускається один раз для перевірки авторизації при монтуванні
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        JSON.parse(storedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Помилка при парсингу loggedInUser з localStorage:', error);
        localStorage.removeItem('loggedInUser');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  // **** ВИПРАВЛЕННЯ ТУТ: ВИКЛИКАЄМО useEffect НА ВЕРХНЬОМУ РІВНІ ****
  // Цей useEffect буде запускатися при кожному рендері, але перенаправляти лише коли потрібно
  useEffect(() => {
    // Перенаправляємо, тільки якщо перевірка завершена (не isLoading)
    // І якщо користувач не авторизований
    if (!isLoading && !isAuthenticated) {
      navigate('/PSYREHABB/', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]); // Залежності: коли змінюється isLoading, isAuthenticated або navigate

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Перевірка авторизації...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />; // Користувач авторизований, рендеримо дочірній маршрут
  } else {
    // Користувач НЕ авторизований.
    // Ми вже ініціювали перенаправлення у верхньому useEffect.
    // Просто показуємо повідомлення, поки відбувається перенаправлення.
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Доступ заборонено. Перенаправлення на головну сторінку...</p>
      </div>
    );
  }
}

export default ProtectedRoute;