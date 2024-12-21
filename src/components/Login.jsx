import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { connect } from "react-redux";
import { loginUser } from "../actions"; 

const LoginSchema = z.object({
  email: z.string().email("Введите корректный адрес электронной почты"),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
});

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      LoginSchema.parse({ email, password });
      setErrors(null);
  
      const response = await fetch('http://localhost:5001/users'); 
      const users = await response.json();
      const storedUser  = users.find((u) => u.email === email && u.password === password);
  
      if (storedUser ) {
        console.log("User  found:", storedUser );
        loginUser ({ email: storedUser .email, createdAt: storedUser .createdAt });
        console.log("Navigating to home");
        navigate("/home");
      } else {
        throw new Error("Неверный email или пароль");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      } else {
        setErrors({ _errors: [err.message] });
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="prose flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md" style={{ width: "100%", maxWidth: "500px" }}>
        <h1 className="text-2xl font-bold text-center">Log in</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        {errors?.email && (
          <div className="text-red-400">{errors.email._errors.join(", ")}</div>
        )}
        {errors?._errors && (
          <div className="text-red-400">{errors._errors.join(", ")}</div>
        )}

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        {errors?.password && (
          <div className="text-red-400">{errors.password._errors.join(", ")}</div>
        )}

        <button
          onClick={handleLogin}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition"
        >
          Log in
        </button>
        <footer className="w-full mt-4 p-4">
          <div className="bg-gray-200 h-0.5 w-full mb-2"></div>
          <div className="flex justify-between">
            <span className="text-gray-700">Created by: Student Victoria</span>
            <span className="text-gray-700">BSU: 2024</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(Login);