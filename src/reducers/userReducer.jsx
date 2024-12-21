const initialState = {
    user: null,
    userExists: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_USER':
        return { ...state, user: action.payload };
      case 'SET_USER_EXISTS':
        return { ...state, userExists: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;