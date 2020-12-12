import { userConstants } from "../constants";
import axios from "../../helpers/axios";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    try {
      const { data } = await axios.post(`http://localhost:5000/api/signup`, {
        ...user,
      });
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { data },
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: userConstants.USER_REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
};
