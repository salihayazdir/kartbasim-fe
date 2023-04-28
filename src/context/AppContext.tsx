import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from 'react';

export interface IAppContext {
  test: string;
  setTest: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  test: '',
  setTest: (test: string) => {},
} as IAppContext;

export const AppContext = createContext<IAppContext>(defaultState);

type AppContextProps = {
  children: ReactNode;
};

export default function AppContextProvider({ children }: AppContextProps) {
  const [test, setTest] = useState<string>('');
  return (
    <AppContext.Provider value={{ test, setTest }}>
      {children}
    </AppContext.Provider>
  );
}
