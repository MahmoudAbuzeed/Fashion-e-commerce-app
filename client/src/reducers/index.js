import adminRegisterReducer from "./admin/register.reducer";
import AdminAuthReducer from "./admin/auth.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  admin: adminRegisterReducer,
  auth: AdminAuthReducer,
});

export default rootReducer;
