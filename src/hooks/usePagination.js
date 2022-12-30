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

export default function usePagination(data, rowsPerPage) {
  const [pagination, dispatchPagination] = useReducer(reducer, {
    currentPage: 1,
    currentData: data.slice(0, rowsPerPage),
    fullData: data,
    rowsPerPage,
  });

  const maxPage = Math.ceil(data.length / rowsPerPage);
  const { currentPage, currentData } = pagination;

  return { currentData, currentPage, maxPage, dispatchPagination };
}
