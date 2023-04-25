import { atom } from "recoil";

export interface SelectCartItems {
  id: number[];
  name: string[];
  thumbnail: string[];
  instructor: string[];
  total_price: number;
}

export const cartSelectAllState = atom<SelectCartItems>({
  key: "isSelectAll",
  default: { id: [], name: [], thumbnail: [], instructor: [], total_price: 0 },
});

export const BuyState = atom<boolean>({
  key: "wasBuyed",
  default: false,
});

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    email: "",
    password: "",

    name: "",
  },
});

export const addressState = atom<string>({
  key: "address",
  default: "",
});
