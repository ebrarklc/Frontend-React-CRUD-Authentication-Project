// src/components/Unauthorized.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import LightImage from '../assets/404 Error Page not Found with people connecting a plug-cuate (1).png'; // Açık tema resmi
import DarkImage from '../assets/404 Error Page not Found with people connecting a plug-cuate.png'; // Koyu tema resmi

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => (theme === 'dark' ? '#1F2937' : '#F7FAFC')};
  color: ${({ theme }) => (theme === 'dark' ? '#FFF' : '#1F2937')};
  position: relative;
`;

const Image = styled.img`
  max-width: 30%;
  height: auto;
`;

const ThemeToggle = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  cursor: pointer;
  font-size: 24px;
`;

const Unauthorized = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <Container theme={theme}>
      <ThemeToggle onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </ThemeToggle>
      <Image 
        src={theme === 'dark' ? DarkImage : LightImage} 
        alt="Unauthorized Access" 
      />
      <button
        onClick={handleNavigateHome}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        Home
      </button>
    </Container>
  );
};

export default Unauthorized;
