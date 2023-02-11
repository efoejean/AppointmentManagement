const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case "CLOSE_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case "notification":
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
