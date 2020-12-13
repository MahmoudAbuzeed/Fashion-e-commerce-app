import { adminConstants } from "../constants";
import axios from "../../helpers/axios";

export const AdminRegister = (user) => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.ADMIN_REGISTER_REQUEST });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/admin/signup`,
        {
          ...user,
        }
      );
      dispatch({
        type: adminConstants.ADMIN_REGISTER_SUCCESS,
        payload: { data },
      });
      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: adminConstants.ADMIN_REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
};
