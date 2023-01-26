import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import {
  LoginUserDto,
  RegisterDonorDto,
  RegisterOrganisationDto,
} from '@/types/dto';
import {
  BloodBank,
  BloodDonation,
  BloodRequest,
  Donor,
  Hospital,
  User,
} from '@/types/entities';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export function useApi(
  { auth, token }: { auth: boolean; token: string } = {
    auth: false,
    token: '',
  }
) {
  if (token)
    Cookies.set('auth.jwt.token', token, { expires: 1, sameSite: 'lax' });

  /**
   * Make axios request with token if needed
   * @param config - axios request config
   * @param needAuth - if true, token is required
   * @param _token - token to use instead of session token
   * @returns axios request
   */
  function request(config: AxiosRequestConfig, needAuth: boolean = true) {
    if (needAuth) {
      if (!auth) {
        throw new Error('Not authenticated');
      }

      if (!token) {
        throw new Error('No token');
      }

      return axiosInstance.request({
        ...config,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    return axiosInstance.request({ ...config });
  }

  const api = {
    //! donors
    createDonor: async (data: Donor) => {
      return request({ method: 'post', url: '/donors', data });
    },

    getDonor: async (id: string) => {
      return request({ method: 'get', url: `/donors/${id}` });
    },

    getDonors: async () => {
      return request({ method: 'get', url: '/donors' });
    },

    updateDonor: async (id: string, data: Donor) => {
      return request({ method: 'patch', url: `/donors/${id}`, data });
    },

    deleteDonor: async (id: string) => {
      return request({ method: 'delete', url: `/donors/${id}` });
    },

    //! hospitals
    createHospital: async (data: Hospital) => {
      return request({ method: 'post', url: '/hospitals', data });
    },

    getHospital: async (id: string) => {
      return request({ method: 'get', url: `/hospitals/${id}` });
    },

    getHospitals: async () => {
      return request({ method: 'get', url: '/hospitals' });
    },

    updateHospital: async (id: string, data: Hospital) => {
      return request({ method: 'patch', url: `/hospitals/${id}`, data });
    },

    deleteHospital: async (id: string) => {
      return request({ method: 'delete', url: `/hospitals/${id}` });
    },

    //! blood banks
    createBloodBank: async (data: BloodBank) => {
      return request({ method: 'post', url: '/blood-banks', data });
    },

    getBloodBank: async (id: string) => {
      return request({ method: 'get', url: `/blood-banks/${id}` });
    },

    getBloodBanks: async () => {
      return request({ method: 'get', url: '/blood-banks' });
    },

    updateBloodBank: async (id: string, data: BloodBank) => {
      return request({ method: 'patch', url: `/blood-banks/${id}`, data });
    },

    deleteBloodBank: async (id: string) => {
      return request({ method: 'delete', url: `/blood-banks/${id}` });
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

    registerEmail: async (data: RegisterDonorDto | RegisterOrganisationDto) => {
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

    resetPassword: async (password: string, hash: string) => {
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

    //! me
    getMe: async () => {
      return request({ method: 'get', url: '/auth/me' });
    },
    updateMe: async (data: User) => {
      return request({ method: 'patch', url: '/auth/me', data });
    },
    deleteMe: async () => {
      return request({ method: 'delete', url: '/auth/me' });
    },

    //! social login
    loginFacebook: async (_token: string) => {
      return request(
        { method: 'post', url: '/auth/facebook/login', data: { _token } },
        false
      );
    },

    loginGoogle: async (_token: string) => {
      return request(
        { method: 'post', url: '/auth/google/login', data: { _token } },
        false
      );
    },

    loginTwitter: async (_token: string, tokenSecret: string) => {
      return request(
        {
          method: 'post',
          url: '/auth/twitter/login',
          data: { _token, tokenSecret },
        },
        false
      );
    },

    loginApple: async (_token: string, firstName: string, lastName: string) => {
      return request(
        {
          method: 'post',
          url: '/auth/apple/login',
          data: { _token, firstName, lastName },
        },
        false
      );
    },

    //! blood requests
    createBloodRequest: async (data: BloodRequest) => {
      return request({ method: 'post', url: '/blood-requests', data });
    },

    getBloodRequest: async (id: string) => {
      return request({ method: 'get', url: `/blood-requests/${id}` });
    },

    getBloodRequests: async () => {
      return request({ method: 'get', url: '/blood-requests' });
    },

    updateBloodRequest: async (id: string, data: BloodRequest) => {
      return request({ method: 'patch', url: `/blood-requests/${id}`, data });
    },

    deleteBloodRequest: async (id: string) => {
      return request({ method: 'delete', url: `/blood-requests/${id}` });
    },

    //! blood donations
    createBloodDonation: async (data: BloodDonation) => {
      return request({ method: 'post', url: '/blood-donations', data });
    },

    getBloodDonation: async (id: string) => {
      return request({ method: 'get', url: `/blood-donations/${id}` });
    },

    getBloodDonations: async () => {
      return request({ method: 'get', url: '/blood-donations' });
    },

    updateBloodDonation: async (id: string, data: BloodDonation) => {
      return request({ method: 'patch', url: `/blood-donations/${id}`, data });
    },

    deleteBloodDonation: async (id: string) => {
      return request({ method: 'delete', url: `/blood-donations/${id}` });
    },
  };

  return { api };
}
