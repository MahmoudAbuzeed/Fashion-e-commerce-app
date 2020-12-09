import userRegisterReducer from "./user/register.reducer";
import AdminAuthReducer from "./admin/auth.reducer";
import categoryReducer from "./admin/category.reducer";
import productReducer from "./admin/product.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userRegisterReducer,
  auth: AdminAuthReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
