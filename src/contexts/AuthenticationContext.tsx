import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';

import api from '~/config/api';
import {
  IAuthenticationContext,
  IAuthenticationCredentials,
  IAuthenticationProvider,
  IAuthenticationState,
} from '~/models/Authentication';
import { IUser } from '~/models/User';
import { AuthenticationService } from '~/services';

const AuthContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthProvider({ children }: IAuthenticationProvider): JSX.Element {
  const [userCredentials, setUserCredentials] =
    useState<IAuthenticationState>();

  const PREFIX = useRef('@Iphoto');

  const authenticationService = useMemo(() => new AuthenticationService(), []);

  const logout = useCallback(() => {
    ['token', 'user', 'token.expires_at'].forEach((key) => {
      localStorage.removeItem(`${PREFIX.current}:${key}`);
    });

    api.defaults.headers.common.Authorization = '';
    setUserCredentials({} as IAuthenticationState);
  }, []);

  const handlePreloadUserCredentials = useCallback(() => {
    const token = localStorage.getItem(`${PREFIX.current}:token`);

    const userString = localStorage.getItem(`${PREFIX.current}:user`);

    if (token && userString) {
      const user: IUser = JSON.parse(userString);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUserCredentials({ user, token });
      return;
    }

    setUserCredentials({} as IAuthenticationState);
  }, []);

  const signin = useCallback<
    ({ email, password }: IAuthenticationCredentials) => Promise<void>
  >(
    async ({ email, password }: IAuthenticationCredentials) => {
      const user = userCredentials;
      if (user) logout();

      try {
        const response = await authenticationService
          .signin({
            email,
            password,
          })
          .then((r) => r.data);

        localStorage.setItem(`${PREFIX.current}:token`, response.token);

        localStorage.setItem(
          `${PREFIX.current}:user`,
          JSON.stringify(response.user),
        );

        const json = {
          user: response.user,
          token: response.token,
        };

        api.defaults.headers.common.Authorization = `Bearer ${json.token}`;

        setUserCredentials(json);
      } catch (error) {
        toast.error('Não foi possível logar na plataforma. Tente novamente.');
      }
    },
    [authenticationService, logout, userCredentials],
  );

  const AuthContextProviderDataMemo = useMemo(
    () => ({
      user: userCredentials ? userCredentials.user : undefined,
      isAuthenticated: !!userCredentials,
      signin,
      logout,
    }),
    [logout, signin, userCredentials],
  );

  useEffect(() => {
    handlePreloadUserCredentials();
  }, [handlePreloadUserCredentials]);

  return (
    <AuthContext.Provider value={AuthContextProviderDataMemo}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthenticationContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
