import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import router from 'next/router';

import type { LoginUserDto, RegisterUserDto } from '@/interfaces/dto';
import type { User } from '@/interfaces/entities';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

function getUserData(): {
  user: User;
  bearerToken: string;
  bearerTokenExp: number;
} {
  return JSON.parse(sessionStorage.getItem('userData') || '{}');
}

function getBearerToken(): string {
  return getUserData().bearerToken;
}

function userTokenIsExpired(): boolean {
  const user = getUserData();
  const { bearerToken, bearerTokenExp } = user;

  if (!user) return true;
  if (!bearerToken) return true;
  if (!bearerTokenExp) return true;

  return new Date().getTime() > bearerTokenExp;
}

function request(config: AxiosRequestConfig, needAuth: boolean = true) {
  if (needAuth) {
    if (!userTokenIsExpired()) {
      return axiosInstance.request({
        ...config,
        headers: { Authorization: `Bearer ${getBearerToken()}` },
      });
    }

    router.push('/login');
  }
  return axiosInstance.request({ ...config });
}

const api = {
  //! users
  createUser: async (data: User) => {
    return request({ method: 'post', url: '/users', data });
  },

  getUser: async (id: string) => {
    return request({ method: 'get', url: `/users/${id}` });
  },

  getUsers: async () => {
    return request({ method: 'get', url: '/users' });
  },

  updateUser: async (id: string, data: User) => {
    return request({ method: 'patch', url: `/users/${id}`, data });
  },

  deleteUser: async (id: string) => {
    return request({ method: 'delete', url: `/users/${id}` });
  },

  //! auth
  loginEmail: async (data: LoginUserDto) => {
    return request({ method: 'post', url: '/auth/email/login', data }, false);
  },

  loginAdminEmail: async (data: LoginUserDto) => {
    return request(
      { method: 'post', url: '/auth/admin/email/login', data },
      false
    );
  },

  registerEmail: async (data: RegisterUserDto) => {
    return request(
      { method: 'post', url: '/auth/email/register', data },
      false
    );
  },

  confirmEmail: async (hash: string) => {
    return request(
      { method: 'post', url: `/auth/email/confirm/`, data: { hash } },
      false
    );
  },

  forgotPassword: async (email: string) => {
    return request(
      { method: 'post', url: `/auth/forgot/password/`, data: { email } },
      false
    );
  },

  resetPassword: async (hash: string, password: string) => {
    return request(
      {
        method: 'post',
        url: '/auth/reset/password/',
        data: {
          password,
          hash,
        },
      },
      false
    );
  },

  me: {
    get: async () => {
      return request({ method: 'get', url: '/auth/me' });
    },
    update: async (data: User) => {
      return request({ method: 'patch', url: '/auth/me', data });
    },
    delete: async () => {
      return request({ method: 'delete', url: '/auth/me' });
    },
  },

  //! social login
  loginFacebook: async (token: string) => {
    return request(
      { method: 'post', url: '/auth/facebook/login', data: { token } },
      false
    );
  },

  loginGoogle: async (token: string) => {
    return request(
      { method: 'post', url: '/auth/google/login', data: { token } },
      false
    );
  },

  loginTwitter: async (token: string, tokenSecret: string) => {
    return request(
      {
        method: 'post',
        url: '/auth/twitter/login',
        data: { token, tokenSecret },
      },
      false
    );
  },

  loginApple: async (token: string, firstName: string, lastName: string) => {
    return request(
      {
        method: 'post',
        url: '/auth/apple/login',
        data: { token, firstName, lastName },
      },
      false
    );
  },

  //! logout
  logout: async () => {
    sessionStorage.clear();
    return window.location.reload();
  },
};

export default api;
