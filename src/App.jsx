import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotes, login, logout } from './actions';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import ViewNote from './components/ViewNote';
import EditNote from './components/EditNote';
import NotFound from './components/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    dispatch(loadNotes(storedNotes));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (newNote) => {
    dispatch(addNote(newNote));
  };

  const handleUpdateNote = (updatedNote) => {
    dispatch(updateNote(updatedNote));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/register" />} />
        <Route path="/notes" element={isAuthenticated ? <Notes notes={notes} onDeleteNote={handleDeleteNote} onLogout={handleLogout} /> : <Navigate to="/register" />} />
        <Route path="/create-note" element={isAuthenticated ? <CreateNote onAddNote={handleAddNote} onLogout={handleLogout} /> : <Navigate to="/register" />} />
        <Route path="/view-note/:id" element={<ViewNote notes={notes} onDeleteNote={handleDeleteNote} onLogout={handleLogout} />} />
        <Route path="/edit-note/:id" element={<EditNote notes={notes} onUpdateNote={handleUpdateNote} onLogout={handleLogout} />} />
        <Route path="*" element={<NotFound isAuthenticated={isAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;