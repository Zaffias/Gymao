import { createContext } from "react";

export const AppContext = createContext({
    authenticated: false,
    setAuthenticated: () => {},
    user: {},
    setUser: () =>{}
});
