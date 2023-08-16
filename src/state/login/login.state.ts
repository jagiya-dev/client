import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface LoginField {
  isLogin: boolean;
}

interface LoginBehaviour {
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const useLoginState = create<LoginField & LoginBehaviour>()(
  immer(
    devtools((set) => ({
      // field
      isLogin: false,

      // behaviour
      login: async () => {
        set((state) => {
          state.isLogin = true;
        });
      },

      logout: async () => {
        set((state) => {
          state.isLogin = false;
        });
      },
    }))
  )
);
