const initialState = {
  isModalOpen: false,
  loginModalOpen: false,
  signupModalOpen: false,
  currentUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "OPEN_LOGIN_MODAL":
      return { ...state, loginModalOpen: action.payload };
    case "CLOSE_LOGIN_MODAL":
      return { ...state, loginModalOpen: action.payload };
    case "OPEN_SIGNUP_MODAL":
      return { ...state, signupModalOpen: action.payload };
    case "CLOSE_SIGNUP_MODAL":
      return { ...state, signupModalOpen: action.payload };
    case "REG_USER":
      return { ...state, currentUser: action.payload };
    case "LOG_USER_IN":
      return { ...state, currentUser: action.payload };
    case "JWT_LOG":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return {
        ...state,
        currentUser: action.payload,
        loginModalOpen: false,
        signupModalOpen: false
      };
    default:
      return state;
  }
}
