import Cart_item from "../../models/cart-items";
import { ADD_TO_CART, CLEAN_CART, REMOVE_FROM_CART } from "../action/Cart";

const initialState = {
  items: {},
  totalAmount: 0,
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedproduct = action.product;
      const productPrice = addedproduct.price;
      const productTitle = addedproduct.title;
      if (state.items[addedproduct.id]) {
        // already have item in the cart
        const updatedCartItam = new Cart_item(
          state.items[addedproduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedproduct.id].sum + productPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedproduct.id]: updatedCartItam,
          },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        const product = new Cart_item(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedproduct.id]: product,
          },
          totalAmount: state.totalAmount + productPrice,
        };
      }
    case REMOVE_FROM_CART:
      const currentyQuenty = state.items[action.Pid].quantity;
      const currentyprice = state.items[action.Pid].productPrice;
      if (currentyQuenty <= 1) {
        const updatedCartItem = { ...state.items };
        delete updatedCartItem[action.Pid];
        return {
          ...state,
          items: updatedCartItem,
          totalAmount: state.totalAmount - currentyprice,
        };
      } else {
        const updatedCartItam = new Cart_item(
          state.items[action.Pid].quantity - 1,
          state.items[action.Pid].productPrice,
          state.items[action.Pid].productTitle,
          state.items[action.Pid].sum - state.items[action.Pid].productPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [action.Pid]: updatedCartItam,
          },
          totalAmount: state.totalAmount - state.items[action.Pid].productPrice,
        };
      }
    case CLEAN_CART:
      return {
        items: {},
        totalAmount: 0,
      };
    default:
      return state;
  }
};

export default Cart;
