import { combineReducers } from 'redux';
import { projectReducer } from './project/projectReducer';
import { threadReducer } from './thread/threadReducer';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  thread: threadReducer,
});

export default rootReducer;
