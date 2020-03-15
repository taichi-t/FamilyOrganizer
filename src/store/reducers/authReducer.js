const initState = {
  authErr: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERR":
      console.log("login err");
      return {
        ...state,
        authErr: "Login failed"
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return { ...state, authErr: null };
    case "SIGN_OUT_SUCCESS":
      console.log("signout success");
      return { ...state, authErr: null };
    case "SIGN_UP_ERR":
      console.log("sign up err", action.err);
      return {
        ...state,
        authErr: action.err.message
      };
    case "SIGN_UP_SUCCESS":
      console.log("sign up success");
      return state;
    default:
      return state;
  }
};

export default authReducer;
