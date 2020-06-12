let accessToken = "";

export const setToken = (s: string) => {
  accessToken = s;
};

export const getToken = () => {
  return accessToken;
};