import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Products";
import {
  REMOVE_USER_ITEM,
  UPDATE_ITEM,
  CREATE_ITEM,
  SET_PRODUCT,
} from "../action/Products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_USER_ITEM:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productid
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productid
        ),
      };
    case CREATE_ITEM:
      const newproduct = new Product(
        action.ProductData.id,
        action.ProductData.ownerId,
        action.ProductData.title,
        action.ProductData.imageUrl,
        action.ProductData.description,
        action.ProductData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newproduct),
        userProducts: state.userProducts.concat(newproduct),
      };
    case UPDATE_ITEM:
      const productindex = state.userProducts.findIndex(
        (p) => p.id === action.pid
      );
      const updatedproduct = new Product(
        action.pid,
        state.userProducts[productindex].ownerId,
        action.ProductData.title,
        action.ProductData.imageUrl,
        action.ProductData.description,
        state.userProducts[productindex].price
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productindex] = updatedproduct;
      const availableProducts = state.availableProducts.findIndex(
        (p) => p.id === action.pid
      );
      const updatedavailableproducts = [...state.availableProducts];
      updatedavailableproducts[availableProducts] = updatedproduct;
      return {
        ...state,
        availableProducts: updatedavailableproducts,
        userProducts: updatedUserProduct,
      };
    case SET_PRODUCT:
      return {
        ...state,
        availableProducts: action.product,
        userProducts: action.userProducts,
      };
    default:
      return state;
  }
};

export default Reducers;
