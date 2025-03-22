// src/components/ResetPassword.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import LightImage from '../assets/Reset password-amico (1).png'; // Açık tema resmi
import DarkImage from '../assets/Reset password-amico.png'; // Koyu tema resmi

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
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const Image = styled.img`
    width: 80%; 
    max-width: 650px;
    height: auto;
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

const ErrorMessage = styled.div`
    color: red;
`;

const BorderBox = styled.div`
    width: 520px;
    height: 480px;
    background-color: ${({ theme }) => (theme === 'dark' ? '#202938' : '#fff')};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
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

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || {}; // Sadece kullanıcı adını al

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Access token is missing.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/changePassword",
                { username, oldPassword, newPassword },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/");
        } catch (error) {
            console.error("Error changing password:", error);
            setError("Failed to change password.");
        }
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
                <BorderBox theme={theme}>
                    <Title style={{fontSize:'34px'}}>Şifreyi Sıfırla</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            placeholder="Eski Şifre"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Yeni Şifre"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <Button type="submit">Şifreyi Sıfırla</Button>
                    </Form>
                </BorderBox>
            </LeftSection>
            <RightSection>
                <Image 
                    src={theme === 'dark' ? DarkImage : LightImage} 
                    alt="Visual Data Illustration" 
                />
            </RightSection>
        </Container>
    );
};

export default ResetPassword;
