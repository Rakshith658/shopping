import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Products";
import { REMOVE_USER_ITEM, UPDATE_ITEM, CREATE_ITEM } from "../action/Products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
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
        new Date().toString(),
        "u1",
        action.ProductData.title,
        action.ProductData.description,
        action.ProductData.imageUrl,
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
        action.ProductData.description,
        action.ProductData.imageUrl,
        state.userProducts[productindex].price
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productindex] = updatedproduct;
      const availableProducts = state.availableProducts.find(
        (p) => p.id === action.pid
      );
      const updatedavailableproducts = [...state.userProducts];
      updatedavailableproducts[availableProducts] = updatedproduct;
      return {
        ...state,
        availableProducts: updatedavailableproducts,
        userProducts: updatedUserProduct,
      };
    default:
      return state;
  }
};

export default Reducers;
