export const getUsernameFromLocalStorage = (): string | null => {
  return localStorage.getItem("username");
};

export const setUsernameInLocalStorage = (username: string): void => {
  localStorage.setItem("username", username);
};
