import AdminAuthReducer from "./admin/auth.reducer";
import AdminCategoryReducer from "./admin/category.reducer";
import AdminProductReducer from "./admin/product.reducer";
import AdminOrderReducer from "./admin/order.reducer";

import userRegisterReducer from "./user/register.reducer";
import userCartReducer from "./user/cart.reducer";
import userCategoryReducer from "./user/category.reducer";
import userReducer from "./user/user.reducer";
import userProductReducer from "./user/product.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: AdminAuthReducer,

  userRegister: userRegisterReducer,
  category: AdminCategoryReducer,
  product: AdminProductReducer,
  order: AdminOrderReducer,

  user: userReducer,
  userCategory: userCategoryReducer,
  userProduct: userProductReducer,
  cart: userCartReducer,
});

export default rootReducer;
