interface IUserData {
  id: number;
  username: string;
  password: string;
}

export const getFromLocalStorage = (): IUserData | {} => {
  const getUser = localStorage.getItem("user");
  if (getUser) {
    return JSON.parse(getUser);
  }
  return {};
};

export const saveToLocalStorage = (userData: IUserData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};
