import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

import reducer from "./reducer";

const initialState = {
  alert: {
    open: false,
    message: "",
    severity: "success",
  },
};

const Context = createContext(initialState);

export const useValue = () => useContext(Context);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
