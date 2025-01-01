export const calculatePaginationTable = (totalItems: number) => { 
  const totalPages = Math.ceil(totalItems / 10)

  return totalPages
}