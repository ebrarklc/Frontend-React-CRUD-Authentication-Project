// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import LightImage from '../assets/Mobile login-cuate (1).png'; // Açık tema resmi
import DarkImage from '../assets/Mobile login-cuate.png'; // Koyu tema resmi

// Animasyonlar ve Stil Tanımları
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: ${({ theme }) => (theme === 'dark' ? '#202938' : '#fff')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#202938')};
`;

const LeftSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const Image = styled.img`
    width: 80%; 
    max-width: 750px;
    height: auto;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    margin-bottom: 50px;
    text-align: center;
    font-family: 'Arial', sans-serif;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.5s ease-in-out;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 25px;
    animation: ${fadeIn} 0.6s ease-in-out;
`;

const Input = styled.input`
    padding: 15px;
    background-color: #fff; 
    border: 2px solid #000;
    border-radius: 5px;
    width: 350px;
    color: #000;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.8);
    }
`;

const Button = styled.button`
    padding: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const ShowPasswordButton = styled.button`
    margin-top: -15px;
    padding: 5px;
    border: none;
    background-color: transparent;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
`;

const RegisterLink = styled.p`
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #007bff;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const BorderBox = styled.div`
    width: 520px;
    height: 470px;
    background-color: ${({ theme }) => (theme === 'dark' ? '#202938' : '#fff')};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 70px;
`;

const ThemeToggle = styled.div`
    position: absolute;
    top: 20px;
    right: 40px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    font-size: 24px;
`;

const LoginPage = () => {
  const [error, setError] = useState("");
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/generateToken",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/userSave");
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
      <LeftSection>
        <Image
          src={theme === 'dark' ? DarkImage : LightImage}
          alt="Visual Data Illustration"
        />
      </LeftSection>
      <RightSection>
        <BorderBox theme={theme}>
          <div>
          <Title style={{ fontSize: '34px', color: props => (props.theme === 'dark' ? '#fff' : '#202938') }}>Giriş Yap</Title>

            <LoginForm onSubmit={handleLogin} />
            {error && <div className="text-red-600 mt-4">{error}</div>}
            <RegisterLink onClick={handleRegisterRedirect}>
              Hesabınız yok mu? Kayıt olun
            </RegisterLink>
          </div>
        </BorderBox>
      </RightSection>
    </Container>
  );
};

export default LoginPage;
