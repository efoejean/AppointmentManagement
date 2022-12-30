export const getCurrentPage = (state, operation) => {
  return operation === "next" ? state.currentPage + 1 : state.currentPage - 1;
};
