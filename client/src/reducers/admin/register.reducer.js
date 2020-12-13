import { adminConstants } from "../../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
};

const adminRegisterReducer = (state = initState, action) => {
  switch (action.type) {
    case adminConstants.ADMIN_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case adminConstants.ADMIN_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case adminConstants.ADMIN_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};

export default adminRegisterReducer;
