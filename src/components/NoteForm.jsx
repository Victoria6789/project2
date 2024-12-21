import React from 'react';

const NoteForm = ({ noteTitle, setNoteTitle, noteText, setNoteText, errors }) => {
  return (
    <div className="w-full">
      <input
        id="noteTitle"
        type="text"
        placeholder="Name"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        className={`border border-gray-300 rounded p-2 w-full mb-2 ${errors.title ? 'border-red-500' : ''}`}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      <textarea
        id="noteText"
        placeholder="Note text..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mb-4"
        rows="5"
      />
    </div>
  );
};

export default NoteForm;