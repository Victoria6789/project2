const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        console.log("Login action dispatched:", action.payload); 
        return { ...state, isAuthenticated: true, user: action.payload };
      default:
        return state;
    }
  };
  
  export default loginReducer;