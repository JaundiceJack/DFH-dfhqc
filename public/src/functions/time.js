// Convert the date to mm/dd/yyyy format
export const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}
