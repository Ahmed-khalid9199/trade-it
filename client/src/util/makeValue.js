export const makeValue = (string) => {
  if (string) {
    return {
      value: string,
      label: string.charAt(0).toUpperCase() + string.slice(1),
    };
  }
  return null;
};
