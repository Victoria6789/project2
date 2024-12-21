import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout as logoutAction } from "../actions";

const Home = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRegistrationDate = localStorage.getItem("registrationDate");

    if (storedEmail) {
      setEmail(storedEmail);
    } else if (location.state && location.state.email) {
      setEmail(location.state.email);
      localStorage.setItem("email", location.state.email);
    }

    if (storedRegistrationDate) {
      setRegistrationDate(storedRegistrationDate);
    } else if (location.state && location.state.registrationDate) {
      setRegistrationDate(location.state.registrationDate);
      localStorage.setItem("registrationDate", location.state.registrationDate);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (email) {
        try {
          const response = await fetch(`http://localhost:5001/notes?email=${encodeURIComponent(email)}`);
          if (response.ok) {
            const data = await response.json();
            setNotes(data);
          } else {
            console.error("Не удалось загрузить заметки:", response.statusText);
          }
        } catch (error) {
          console.error("Ошибка при загрузке заметок:", error);
        }
      }
    };

    fetchNotes();
  }, [email]);

  const handleLogout = () => {
    onLogout(); 
    localStorage.removeItem("email");
    localStorage.removeItem("registrationDate");
    navigate("/login");
  };

  const dateObj = new Date(registrationDate);
  const formattedDate = dateObj.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const displayDate = isNaN(dateObj) ? "Дата недоступна" : formattedDate;

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div
        className="prose flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <header className="flex justify-between items-center mb-4">
          <nav>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-black-400 mx-2 no-underline"
                  : "text-gray-600 mx-2 no-underline"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-black-400 mx-2 no-underline"
                  : "text-gray-600 mx-2 no-underline"
              }
            >
              Notes
            </NavLink>
            <span
              onClick={handleLogout}
              className="text-gray-600 cursor-pointer hover:text-red-700 transition mx-2"
            >
              Log Out
            </span>
          </nav>
        </header>
        <h1 className="text-2xl font-bold text-center">About me</h1>
        <div className="text-center">
          <p>Email: {email}</p>
          <p>Date sign up: {displayDate}</p>
          <button
            onClick={() => navigate("/notes")}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition mt-4"
          >
            Go to notes
          </button>
        </div>
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

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Home);