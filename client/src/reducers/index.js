import adminReducer from "./admin.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  admin: adminReducer,
});

export default rootReducer;
