import { User } from '@/data/models/entityModels';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from 'react';

export interface IAppContext {
  userContext: User | null;
  setUserContext: Dispatch<SetStateAction<User | null>>;
}

const defaultState = {
  userContext: null,
  setUserContext: (user: User | null) => {},
} as IAppContext;

export const AppContext = createContext<IAppContext>(defaultState);

type AppContextProps = {
  children: ReactNode;
};

export default function AppContextProvider({ children }: AppContextProps) {
  const [userContext, setUserContext] = useState<User | null>(null);
  return (
    <AppContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </AppContext.Provider>
  );
}
