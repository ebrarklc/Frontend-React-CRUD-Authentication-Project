import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token) {
        setError("No access token found.");
        navigate("/unauthorized");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/v1/hello", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username || response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Access token expired, attempt to refresh
          try {
            const refreshResponse = await axios.post(
              "http://localhost:8080/api/v1/refreshToken",
              { refreshToken }
            );

            // Update local storage with new tokens
            localStorage.setItem(
              "accessToken",
              refreshResponse.data.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              refreshResponse.data.refreshToken
            );

            // Retry fetching the username with the new access token
            const retryResponse = await axios.get(
              "http://localhost:8080/api/v1/hello",
              {
                headers: {
                  Authorization: `Bearer ${refreshResponse.data.accessToken}`,
                },
              }
            );
            setUsername(retryResponse.data.username || retryResponse.data);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            navigate("/unauthorized");
          }
        } else {
          console.error("Error fetching username:", error);
          setError("Failed to fetch username.");
        }
      }
    };

    fetchUsername();
  }, [navigate]);

  const handleResetPassword = () => {
    navigate("/resetPassword", { state: { username } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      {error && <div className="text-red-600">{error}</div>}
      {username && <div className="text-xl">Hello, {username}!</div>}
      <button
        onClick={handleResetPassword}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Reset Password
      </button>
    </div>
  );
};

export default Home;
