export const REMOVE_USER_ITEM = "REMOVE_USER_ITEM";
export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";

export const remove_user_item = (productid) => {
  return {
    type: REMOVE_USER_ITEM,
    productid: productid,
  };
};

export const create_item = (title, description, imageUrl, price) => {
  return {
    type: CREATE_ITEM,
    ProductData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const update_item = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_ITEM,
    pid: id,
    ProductData: {
      title,
      description,
      imageUrl,
    },
  };
};
