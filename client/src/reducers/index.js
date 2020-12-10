import userRegisterReducer from "./user/register.reducer";
import AdminAuthReducer from "./admin/auth.reducer";
import categoryReducer from "./admin/category.reducer";
import productReducer from "./admin/product.reducer";
import orderReducer from "./admin/order.reducer";
import pageReducer from "./admin/page.reducer";

import cartReducer from "./user/cart.reducer";
import userCategoryReducer from "./user/category.reducer";
import userReducer from "./user/user.reducer";
import userProductReducer from "./user/product.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  auth: AdminAuthReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  page: pageReducer,
  cart: cartReducer,
  userCategory: userCategoryReducer,
  user: userReducer,
  userProduct: userProductReducer,
});

export default rootReducer;
