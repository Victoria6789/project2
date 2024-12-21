import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout as logoutAction, deleteNote as deleteNoteAction } from "../actions";

const Notes = ({ notes, onDeleteNote, onLogout }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту заметку?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5001/notes/${id}`, {
        method: 'DELETE',
      });
      onDeleteNote(id); 
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
      <div
        className="prose p-6 bg-white rounded-lg shadow-md"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <header className="flex justify-between w-full mb-4">
          <nav className="flex items-center">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-black-600 mx-2 no-underline"
                  : "text-gray-600 mx-2 no-underline"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-black-600 mx-2 no-underline"
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

        <h1 className="text-2xl font-bold text-center">Заметки</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => navigate("/create-note")}
            className="bg-gray-600 text-white p-3 text-lg rounded hover:bg-gray-400 transition"
          >
            Добавить новую заметку
          </button>
        </div>

        <ul className="list-disc pl-5 w-full">
          {notes.length > 0 ? (
            notes.map((note) => (
              <li
                key={note.id}
                className="py-2 flex justify-between items-center bg-gray-100 rounded p-3 mb-2"
              >
                <Link
                  to={`/view-note/${note.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <strong>{note.title}</strong> -{" "}
                  {new Date(note.createdAt).toLocaleDateString("ru-RU")}
                </Link>
                <div className="flex items-center space-x-2">
                  <Link to={`/edit-note/${note.id}`} aria-label="Редактировать">
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    aria-label="Удалить"
                    className="text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center">У вас нет заметок.</p>
          )}
        </ul>

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
  onDeleteNote: (id) => dispatch(deleteNoteAction(id)), 
  onLogout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);