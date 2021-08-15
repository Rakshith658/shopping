export const ADD_ORDER = "ADD_ORDER";

export const add_order = (carttems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: {
      items: carttems,
      totalAmount: totalAmount,
    },
  };
};
