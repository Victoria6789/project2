import { createStore, combineReducers } from 'redux';
import notesReducer from './reducers/notesReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer'; 

const rootReducer = combineReducers({
  notes: notesReducer,
  auth: authReducer,
  user: userReducer,
  login: loginReducer, 
});

const store = createStore(rootReducer);

export default store;