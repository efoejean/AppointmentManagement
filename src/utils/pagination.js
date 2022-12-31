export const getCurrentPage = (state, operation) => {
  return operation === "NEXT" ? state.currentPage + 1 : state.currentPage - 1;
};

export const getCurrentData = (state, currentPage) => {
  const start = (currentPage - 1) * state.rowsPerPage;
  const end = start + state.rowsPerPage;
  return state.data.slice(start, end);
};
