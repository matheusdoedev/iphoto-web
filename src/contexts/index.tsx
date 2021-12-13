import { ReactNode } from 'react';
import { AuthProvider } from './AuthenticationContext';

interface IAppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: IAppProviderProps): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
