import adminRegisterReducer from "./admin/register.reducer";
import AdminAuthReducer from "./admin/auth.reducer";
import categoryReducer from "./admin/category.reducer";
import productReducer from "./admin/product.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  admin: adminRegisterReducer,
  auth: AdminAuthReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
