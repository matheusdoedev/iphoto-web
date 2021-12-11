import { ReactNode } from 'react';

export interface IAuthenticationCredentials {
  email: string;
  password: string;
}

export interface ISignUpDto {
  name: string;
  email: string;
  password: string;
}

export interface ISignUpResponseUser {
  email: string;
  name: string;
  accepted_terms: boolean;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ISignUpResponse {
  user: ISignUpResponseUser;
  token: string;
}

export interface IAuthenticationContext {
  user: ISignUpResponseUser | undefined;
  isAuthenticated: boolean;
  signin(credentials: IAuthenticationCredentials): Promise<void>;
  logout(): void;
  userPreloaded: boolean;
}

export interface IAuthenticationState extends ISignUpResponse {}

export interface IAuthenticationProvider {
  children: ReactNode;
}
