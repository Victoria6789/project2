import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout as logoutAction, deleteNote as deleteNoteAction } from "../actions";

const ViewNote = ({ notes, onDeleteNote, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const noteId = parseInt(id, 10);
  const note = notes.find(note => note.id.startsWith(id));
  
  console.log("Note ID from URL:", noteId);
  console.log("All notes:", notes);
  console.log("Found note:", note);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту заметку?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5001/notes/${note.id}`, {
        method: 'DELETE',
      });
      onDeleteNote(note.id);
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка удаления заметки:", error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="prose p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
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
              className="text-gray-600 cursor-pointer hover:text-red-700 transition mx-2 no-underline"
            >
              Log Out
            </span>
          </nav>
        </header>
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/notes"
            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-700 transition mr-4 no-underline"
          >
            Back
          </Link>
          <h1 className="text-2xl font-bold text-center flex-grow">
            {note ? note.title : "Заметка не найдена"}
          </h1>
          <div className="ml-4">
            {note && (
              <>
                <Link
                  to={`/edit-note/${note.id}`}
                  className="text-gray-600 hover:text-blue-600 mr-2"
                >
                  ✏️
                </Link>
                <button
                  onClick={handleDelete}
                  className="text-gray-600 hover:text-red-700"
                >
                  🗑
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          {note ? <pre>{note.text}</pre> : <p>Содержимое отсутствует.</p>}
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

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteNote: (id) => dispatch(deleteNoteAction(id)),
  onLogout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewNote);
