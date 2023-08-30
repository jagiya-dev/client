import { atom } from "recoil";

interface LoginField {
  isLoggedIn: boolean;
}

interface LoginBehaviour {
  login: () => Promise<void>;
  logOut: () => Promise<void>;
}

const loginState = atom<LoginField & LoginBehaviour>({
  key: "loginState",
  default: {
    isLoggedIn: false,
    login: () => {
      return Promise.resolve();
    },
    logOut: () => {
      return Promise.resolve();
    },
  },
});
