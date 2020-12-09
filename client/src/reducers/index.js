import userRegisterReducer from "./user/register.reducer";
import AdminAuthReducer from "./admin/auth.reducer";
import categoryReducer from "./admin/category.reducer";
import productReducer from "./admin/product.reducer";
import orderReducer from "./admin/order.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userRegisterReducer,
  auth: AdminAuthReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
