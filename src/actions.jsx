export const REGISTER_USER = 'REGISTER_USER';
export const SET_USER_EXISTS = 'SET_USER_EXISTS';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const setUserExists = (exists) => ({
  type: SET_USER_EXISTS,
  payload: exists,
});

export const loginUser  = (user) => ({
    type: 'LOGIN_USER',
    payload: user,
  });

  export const addNote = (note) => ({
    type: 'ADD_NOTE',
    payload: note,
});
  
export const updateNote = (note) => ({
    type: 'UPDATE_NOTE',
    payload: note,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });

export const deleteNote = (id) => ({ type: 'DELETE_NOTE', payload: id });
export const loadNotes = (notes) => ({ type: 'LOAD_NOTES', payload: notes });
export const login = () => ({ type: 'LOGIN' });
