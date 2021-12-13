import { AxiosPromise } from 'axios';

import api from '~/config/api';
import {
  IAuthenticationCredentials,
  ISignUpDto,
  ISignUpResponse,
} from '~/models/Authentication';

class AuthenticationService {
  private baseUrl = 'auth';

  signin(data: IAuthenticationCredentials): AxiosPromise<ISignUpResponse> {
    return api.post(`${this.baseUrl}/signin`, data);
  }

  signup(data: ISignUpDto): AxiosPromise<ISignUpResponse> {
    return api.post(`${this.baseUrl}/signup`, data);
  }
}

export default AuthenticationService;
