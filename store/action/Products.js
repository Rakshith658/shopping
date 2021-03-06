import Product from "../../models/Products";

export const REMOVE_USER_ITEM = "REMOVE_USER_ITEM";
export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProduct = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://shopping-b3df4-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const responseData = await response.json();

      const loadedProducts = [];
      for (const key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            responseData[key].ownerId,
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].description,
            responseData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCT,
        product: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (error) {
      // custom analytict server
      throw error;
    }
  };
};

export const remove_user_item = (productid) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shopping-b3df4-default-rtdb.firebaseio.com/products/${productid}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong. Please try again");
    }

    dispatch({
      type: REMOVE_USER_ITEM,
      productid: productid,
    });
  };
};

export const create_item = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shopping-b3df4-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const responseData = await response.json();
    dispatch({
      type: CREATE_ITEM,
      ProductData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const update_item = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://shopping-b3df4-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, imageUrl }),
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong. Please try again");
      }
    } catch (error) {
      throw error;
    }

    dispatch({
      type: UPDATE_ITEM,
      pid: id,
      ProductData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
