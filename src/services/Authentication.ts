import { AxiosPromise } from 'axios';

import api from '~/config/api';
import {
  IAuthenticationCredentials,
  ISignUpDto,
} from '~/models/Authentication';

class AuthenticationService {
  private baseUrl = 'auth';

  signin(data: IAuthenticationCredentials): AxiosPromise {
    return api.post(`${this.baseUrl}/signin`, data);
  }

  signup(data: ISignUpDto): AxiosPromise {
    return api.post(`${this.baseUrl}/signup`, data);
  }
}

export default AuthenticationService;
