export const convertDate = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};
