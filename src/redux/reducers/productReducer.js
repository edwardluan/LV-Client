import { DeleteData, EditData } from "../actions/globalTyles";
import { PRODUCTTYPE } from "../actions/productAction";

const initialState = {
  products: [],
  product: [],
  userProducts: [],
  result: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTTYPE.CREATE_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case PRODUCTTYPE.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        result: action.payload.result,
      };
    case PRODUCTTYPE.GET_PRODUCT:
      return {
        ...state,
        product: [action.payload],
      };
    case PRODUCTTYPE.GET_USER_PRODUCTS:
      return {
        ...state,
        userProducts: action.payload
      }
    case PRODUCTTYPE.UPDATE_PRODUCT:
      return {
        ...state,
        products: EditData(state.products, action.payload._id, action.payload)
      }
    case PRODUCTTYPE.DELETE_PRODUCT:
      return {
       ...state,
        products: DeleteData(state.products, action.payload._id)
      }
    default:
      return state;
  }
};

export default productReducer;
