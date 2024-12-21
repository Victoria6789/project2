import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addNote as addNoteAction, logout as logoutAction } from "../actions"; 

const CreateNote = ({ onAddNote, onLogout }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [errors, setErrors] = useState({ title: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = { title: "" };
  
    if (noteTitle.trim() === "") {
      newErrors.title = "Название заметки не может быть пустым";
      formIsValid = false;
    }
  
    setErrors(newErrors);
  
    if (formIsValid) {
      const newNote = {
        title: noteTitle,
        text: noteText,
        createdAt: new Date().toISOString(),
      };
  
      try {
        const response = await fetch('http://localhost:5001/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNote),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Ошибка при сохранении заметки: ${errorMessage}`);
        }
  
        const savedNote = await response.json();
        onAddNote(savedNote); 
        navigate(`/view-note/${savedNote.id}`);
  
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <div
        className="prose p-6 bg-white rounded-lg shadow-md"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <header className="flex justify-between w-full mb-4">
          <nav className="flex items-center">
            <Link
              to="/home"
              className="mx-2 text-gray-600 hover:text-gray-800 no-underline"
            >
              About
            </Link>
            <Link
              to="/notes"
              className="mx-2 text-gray-600 hover:text-gray-800 no-underline"
            >
              Notes
            </Link>
            <span
              onClick={handleLogout}
              className="text-gray-600 cursor-pointer hover:text-red-700 transition mx-2"
            >
              Log Out
            </span>
          </nav>
        </header>

        <div className="flex items-center w-full mb-4">
          <Link
            to="/notes"
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition mr-4 no-underline"
          >
            Back
          </Link>
          <h1 className="text-2xl font-bold flex-grow text-center">
            Create New Note
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            id="noteTitle"
            type="text"
            placeholder="Название заметки"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className={`border border-gray-300 rounded p-2 w-full mb-2 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          <textarea
            id="noteText"
            placeholder="Текст заметки..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-4"
            rows="5"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition"
            >
              Создать
            </button>
          </div>
        </form>

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
  onAddNote: (note) => dispatch(addNoteAction(note)), 
  onLogout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(CreateNote);