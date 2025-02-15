import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(isLogin ? "Login Successful!" : "Signup Successful!");
        console.log("Response:", data);

        // Navigate after successful action
        if (isLogin) {
          navigate("/"); // Redirect to Home Page
        } else {
          setIsLogin(true); // Switch to Login Form after Signup
        }
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, try again later.");
    }
  };

  return (
    <div
      className="flex justify-end items-center min-h-screen bg-cover bg-center p-5"
      style={{ backgroundImage: "url('https://e0.pxfuel.com/wallpapers/860/271/desktop-wallpaper-books-library-shelves-lighting-book-library-background-cool-library.jpg')" }}
    >
      <div className="w-1/3 bg-amber-50 p-10 shadow-lg rounded-lg min-h-[450px] flex flex-col justify-between mr-30 backdrop-blur-lg bg-black/20">
        <h2 className="text-center text-2xl font-semibold mb-4 text-white">NovelNest</h2>

        <div className="flex justify-center mb-6 text-white">
          <button
            className={`px-4 py-2 rounded-l-full cursor-pointer w-3xs ${isLogin ? "bg-amber-200 text-black" : "bg-white text-black"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-r-full cursor-pointer w-3xs ${!isLogin ? "bg-amber-200 text-black" : "bg-white text-black"}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <div className="flex-grow flex items-center">
          <form className="w-full text-white" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <label className="mb-1">Username</label>
                <input className="mb-3 p-2 border rounded w-full text-white" type="text" name="username" value={formData.username} onChange={handleChange} required />
              </>
            )}

            <label className="mb-1">Email</label>
            <input className="mb-3 p-2 border rounded w-full text-white" type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label className="mb-1">Password</label>
            <input className="mb-3 p-2 border rounded w-full text-white" type="password" name="password" value={formData.password} onChange={handleChange} required />

            {!isLogin && (
              <>
                <label className="mb-1">Confirm Password</label>
                <input className="mb-3 p-2 border rounded w-full text-white" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </>
            )}

            <button className="bg-amber-200 cursor-pointer text-black px-4 py-2 rounded-full w-full mt-3">
              {isLogin ? "Step-in" : "Join"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
