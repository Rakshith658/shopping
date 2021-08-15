import Order from "../../models/order";
import { ADD_ORDER } from "../action/Orders";

const initialstate = {
  order: [],
};

const OrderReducers = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.totalAmount,
        new Date()
      );
      return {
        ...state,
        order: state.order.concat(newOrder),
      };

    default:
      return state;
  }
};
export default OrderReducers;
