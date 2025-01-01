import { AuthResponse, LoginRequest } from '../models/auth';
import { HttpResponse } from '../models/http';
import axiosClient, { handleRequest } from './axiosClient';

const authApi = {
  login: (body: LoginRequest): Promise<HttpResponse<AuthResponse>> => {
    const url = `/auth/login`;
    return handleRequest(axiosClient.post(url, body));
  },
};

export default authApi;
