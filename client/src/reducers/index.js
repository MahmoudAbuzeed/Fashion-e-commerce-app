import userReducer from "./user.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
