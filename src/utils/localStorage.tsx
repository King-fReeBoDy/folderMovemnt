interface IUserData {
  username: string;
  password: string;
  role: string;
}

export const getFromSessionStorage = (): IUserData | null => {
  const getUser = sessionStorage.getItem("user");
  if (getUser) {
    return JSON.parse(getUser);
  }
  return null;
};

export const saveToSessionStorage = (userData: IUserData) => {
  sessionStorage.setItem("user", JSON.stringify(userData));
};

export const clearSessionStorage = () => {
  sessionStorage.removeItem("user");
};
