import userRegisterReducer from "./user/register.reducer";
import AdminAuthReducer from "./admin/auth.reducer";
import categoryReducer from "./admin/category.reducer";
import productReducer from "./admin/product.reducer";
import orderReducer from "./admin/order.reducer";
import cartReducer from "./user/cart.reducer";
import userCategoryReducer from "./user/category.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userRegisterReducer,
  auth: AdminAuthReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  cart: cartReducer,
  userCategory: userCategoryReducer,
});

export default rootReducer;
