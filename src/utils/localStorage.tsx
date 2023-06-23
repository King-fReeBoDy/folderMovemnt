interface IUserData {
  username: string;
  password: string;
  role: string;
}

export const getFromLocalStorage = (): IUserData | null => {
  const getUser = localStorage.getItem("user");
  if (getUser) {
    return JSON.parse(getUser);
  }
  return null;
};

export const saveToLocalStorage = (userData: IUserData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const clearLocalStorage = () => {
  localStorage.removeItem("user");
};
