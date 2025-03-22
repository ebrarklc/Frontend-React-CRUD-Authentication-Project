import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import LightImage from "../assets/Computer login-amico.png"; // Light theme image
import DarkImage from "../assets/Computer login-amico (1).png"; // Dark theme image

// Animations and Styles
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
  background-color: ${({ theme }) => (theme === "dark" ? "#202938" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#202938")};
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
  font-family: "Arial", sans-serif;
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
  height: 600px;
  background-color: ${({ theme }) => (theme === "dark" ? "#202938" : "#fff")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 70px;
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

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 5 || password.length > 16) {
      setError("Password length must be between 5 and 16 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/app", { state: { username } });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <Container theme={theme}>
      <ThemeToggle onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </ThemeToggle>
      <LeftSection>
        <BorderBox theme={theme}>
        <div style={{ transform: "scale(0.8)" }}>
  <Title style={{fontSize:'34px'}}>Kayıt Ol</Title>
  {error && <div className="mb-4 text-red-600">{error}</div>}
  <Form onSubmit={handleSubmit} >
    <div className="mb-4">
      <label className="block text-sm font-medium" htmlFor="name" >
        Name
      </label>
      <Input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{width:'450px'}}
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium" htmlFor="username">
        Username
      </label>
      <Input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{width:'450px'}}
      />
    </div>

    <div className="mb-4 relative">
      <label className="block text-sm font-medium" htmlFor="password">
        Password
      </label>
      <Input
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{width:'450px'}}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
        style={{marginTop:'10px'}}
      >
        {showPassword ? (
          <EyeOff className="text-black" />
        ) : (
          <Eye className="text-black" />
        )}
      </button>
    </div>

    <div className="mb-4 relative">
      <label
        className="block text-sm font-medium"
        htmlFor="confirmPassword"
      >
        Confirm Password
      </label>
      <Input
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={{width:'450px'}}
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
        style={{marginTop:'10px'}}
      >
        {showConfirmPassword ? (
          <EyeOff className="text-black" />
        ) : (
          <Eye className="text-black" />
        )}
      </button>
    </div>

    <Button type="submit">Kayıt Ol</Button>
  </Form>
  <RegisterLink onClick={() => navigate("/")} style={{fontSize:'20px'}}>
    Hesabınız var mı? Giriş yapın
  </RegisterLink>
</div>

        </BorderBox>
      </LeftSection>
      <RightSection>
        <Image
          src={theme === "dark" ? DarkImage : LightImage}
          alt="Visual Data Illustration"
        />
      </RightSection>
    </Container>
  );
};

export default RegisterPage;
