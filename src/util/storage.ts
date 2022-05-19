export const setValueInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLocalStorage = (key: string) => {
  try {
    const data: any = localStorage.getItem(key);
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch {
    return null;
  }
};
