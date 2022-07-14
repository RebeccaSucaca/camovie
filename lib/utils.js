const TOKEN_NAME = "camovie_memberId";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  // localStorage.setItem(TOKEN_NAME, token);
  if (typeof window !== 'undefined') {

  sessionStorage.setItem(TOKEN_NAME, token);
  }
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {

  // return localStorage.getItem(TOKEN_NAME);
  return sessionStorage.getItem(TOKEN_NAME);
  }
};

// 從 localStorage 清除 token
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {

  // return localStorage.removeItem(TOKEN_NAME);
  return sessionStorage.removeItem(TOKEN_NAME);}
};