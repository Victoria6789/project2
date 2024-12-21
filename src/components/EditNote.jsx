import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { updateNote as updateNoteAction, logout as logoutAction } from "../actions";
import NoteForm from "./NoteForm";

const EditNote = ({ notes, onUpdateNote, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [errors, setErrors] = useState({ title: "", text: "" });

  useEffect(() => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setNoteTitle(note.title);
      setNoteText(note.text);
    } else {
      console.warn("Note not found:", id);
    }
  }, [id, notes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = { title: "", text: "" };
  
    if (noteTitle.trim() === "") {
      newErrors.title = "Название заметки не может быть пустым";
      formIsValid = false;
    }
  
    setErrors(newErrors);
  
    if (formIsValid) {
      const updatedNote = {
        id: id,
        title: noteTitle,
        text: noteText,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch(`http://localhost:5001/notes/${updatedNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });

        if (!response.ok) {
          throw new Error('Не удалось обновить заметку');
        }

        onUpdateNote(updatedNote);
        navigate(`/view-note/${updatedNote.id}`);
      } catch (error) {
        console.error("Ошибка обновления заметки:", error);
      }
    }
  };

  const handleLogout = () => {
    onLogout(); 
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div
        className="prose p-6 bg-white rounded-lg shadow-md"
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

        <div className="flex items-center w-full mb-4">
          <Link
            to="/notes"
            className="bg-gray-500 text-white p-1 rounded hover:bg-gray-700 transition mr-4 no-underline"
          >
            Back
          </Link>
          <h1 className="text-2xl font-bold flex-grow text-center">
            Edit note
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <NoteForm
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
            noteText={noteText}
            setNoteText={setNoteText}
            errors={errors}
          />
          <button
            type="submit"
            className="bg-gray-500 text-white rounded hover:bg-gray-700 transition w-[200px] mt-4 py-2"
          >
            Save
          </button>
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

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateNote: (note) => dispatch(updateNoteAction(note)),
  onLogout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);