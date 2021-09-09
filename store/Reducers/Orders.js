import Order from "../../models/order";
import { ADD_ORDER, SET_ORDER } from "../action/Orders";

const initialstate = {
  order: [],
};

const OrderReducers = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        action.orderData.date
      );
      return {
        ...state,
        order: state.order.concat(newOrder),
      };

    case SET_ORDER:
      return {
        order: action.orders,
      };
    default:
      return state;
  }
};
export default OrderReducers;
