import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { connect } from "react-redux";
import { registerUser, setUserExists } from "../actions";

const UserSchema = z.object({
  email: z.string().email("Введите корректный адрес электронной почты"),
  password: z.string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
  confirmPassword: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const Registration = ({ registerUser, setUserExists, userExists }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const checkUser = async (email) => {
    const response = await fetch('http://localhost:5001/users'); 
    const users = await response.json();
    return users.some(u => u.email === email);
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);
    const exists = await checkUser(email);
    setUserExists(exists);
  };

  const handleRegister = async () => {
    if (userExists) {
      setErrors({ _errors: ["Пользователь с таким адресом электронной почты уже зарегистрирован. Пожалуйста, войдите."] });
      return;
    }

    try {
      const user = UserSchema.parse({ email, password, confirmPassword });
      const createdAt = Date.now();

      const userData = { id: createdAt, email, password, createdAt };

      const response = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при регистрации');
      }

      setErrors(null);
      localStorage.setItem("user", JSON.stringify(userData));
      registerUser(userData);
      navigate("/login"); 
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      } else {
        console.error("Registration error:", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="prose flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md" style={{ width: "100%", maxWidth: "500px" }}>
        <h1 className="text-2xl font-bold text-center">Sign up</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={handleEmailChange} 
          className="border border-gray-300 rounded p-2"
        />
        {userExists && <div className="text-red-400">Пользователь с таким адресом электронной почты уже зарегистрирован.</div>}
        {errors?.email && <div className="text-red-400">{errors.email._errors.join(", ")}</div>}
        
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        {errors?.password && <div className="text-red-400">{errors.password._errors.join(", ")}</div>}
        
        <input
          placeholder="Repeat password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        {errors?.confirmPassword && <div className="text-red-400">{errors.confirmPassword._errors.join(", ")}</div>}
        
        <div className="flex justify-center">
          <button 
            onClick={handleRegister} 
            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-700 transition"
            style={{ width: "100px" }}
          >
            Sign up
          </button>
        </div>
        <footer className="w-full mt-4 p-4">
          <div className="bg-gray-200 h-0.5 w-full mb-2"></div>
          <div className="flex justify-between">
            <span className="text-gray-700">Created by: Student Victoria</span>
            <span className="text-gray-700">BSU: 2024</span>
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-700">Already registered? <a href="/login" className="text-blue-500">Enter</a></span>
          </div>
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userExists: state.user.userExists,
});

const mapDispatchToProps = {
  registerUser,
  setUserExists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);