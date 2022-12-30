import { useReducer } from "react";
import { getCurrentData, getCurrentPageData } from "../utils/pagination";

function reducer(state, action) {
  const currentPage = getCurrentPageData(state, action.type);
  const currentData = getCurrentData(state, currentPage);

  return {
    ...state,
    currentPage,
    currentData,
  };
}
