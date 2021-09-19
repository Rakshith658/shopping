export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxE0-jD7AVQdU5mhDhmH1-kUhlxo6ragw",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong!");
    }

    const respondata = await response.json();
    console.log(respondata);
    dispatch({
      type: SIGNUP,
    });
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxE0-jD7AVQdU5mhDhmH1-kUhlxo6ragw",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong!");
    }

    const respondata = await response.json();
    console.log(respondata);
    dispatch({
      type: LOGIN,
    });
  };
};
