import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

let timer;

export const authentication = (userId, token, expiryTime) => {
  return async (dispatch) => {
    // dispatch(setlogout(expiryTime));
    dispatch({
      type: AUTH,
      userId: userId,
      token: token,
    });
  };
};

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
    dispatch(
      authentication(
        respondata.localId,
        respondata.idToken,
        parseInt(respondata.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(respondata.expiresIn) * 1000
    );
    saveData(respondata.idToken, respondata.localId, expirationDate);
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
    dispatch(
      authentication(
        respondata.localId,
        respondata.idToken,
        parseInt(respondata.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(respondata.expiresIn) * 1000
    );
    saveData(respondata.idToken, respondata.localId, expirationDate);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setlogout = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime / 10);
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const saveData = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
