import { createContext, useEffect, useReducer, ReactNode } from "react";
import Reducer from "./Reducer";

interface IState {
  user: any;
  isFetching: boolean;
  error: boolean;
}

interface IContextProps {
  children: ReactNode;
}

interface IContext extends IState {
  dispatch: React.Dispatch<any>;
}
const userFromLocalStorage = localStorage.getItem("user");
const INITIAL_STATE: IState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
  isFetching: false,
  error: false,
};

export const Context = createContext<IContext>({
  ...INITIAL_STATE,
  dispatch: () => {},
});

export const ContextProvider = ({ children }: IContextProps) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
