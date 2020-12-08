import { productConstants } from "../../actions/constants";

const initState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }

  return state;
};

export default productReducer;
