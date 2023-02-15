/**
 * Pagination utility function.
 * @param array Array to paginate
 * @param pageSize Total number of items per page
 * @param pageNumber Page number to slice from the array
 * @returns A new array with the sliced, paginated items
 */
export const paginate = <T extends Array<any>>(
  array: T,
  pageSize: number,
  pageNumber: number,
) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
