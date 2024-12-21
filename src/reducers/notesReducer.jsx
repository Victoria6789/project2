const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
      case "UPDATE_NOTE":
  const updatedNotes = state.notes.map((note) =>
    note.id === action.payload.id ? action.payload : note
  );
  console.log("Updated notes state:", updatedNotes);
  return {
    ...state,
    notes: updatedNotes,
  };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "LOAD_NOTES":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

export default notesReducer;
