import { useReducer } from "react";
import { getCurrentData, getCurrentPage } from "../utils/pagination";

function reducer(state, action) {
  const currentPage = getCurrentPage(state, action.type);
  const currentData = getCurrentData(state, currentPage);

  return {
    ...state,
    currentPage,
    currentData,
  };
}

export default function usePagination(data, rowsPerPage = 10) {
  const [pagination, dispatchPagination] = useReducer(reducer, {
    currentPage: 1,
    currentData: data.slice(0, rowsPerPage),
    fullData: data,
    rowsPerPage,
  });

  const maxPage = Math.ceil(data.length / rowsPerPage);
  const { currentData, currentPage } = pagination;

  return { currentData, currentPage, maxPage, dispatchPagination };
}
