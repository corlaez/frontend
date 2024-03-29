import { createContext } from "react";
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  getUser: async () => {
    let user = await fetch("/api/users/current", {
      credentials: "include",
    }).then((res) => {
      if (res.status === 204) return Promise.resolve(null);
      return res.json();
    });
    return user || null;
  },
});
