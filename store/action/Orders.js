import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetch_Order = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://shopping-b3df4-default-rtdb.firebaseio.com/order/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const responseData = await response.json();

      const loadedOrder = [];
      for (const key in responseData) {
        loadedOrder.push(
          new Order(
            key,
            responseData[key].carttems,
            responseData[key].totalAmount,
            new Date(responseData[key].data)
          )
        );
      }
      dispatch({ type: SET_ORDER, orders: loadedOrder });
    } catch (error) {
      // custom analytict server
      throw error;
    }
  };
};

export const add_order = (carttems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://shopping-b3df4-default-rtdb.firebaseio.com/order/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carttems,
          totalAmount,
          data: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("something went wrong. Please try again");
    }

    const responseData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: carttems,
        totalAmount: totalAmount,
        date: date,
      },
    });
  };
};
