// Packages
import axios from 'axios';

// Configuration
import CONFIG from '../../../config/config';
import ENDPOINT from '../../../config/api/dicoding-story-api/endpoint';

// Errors
import { APIError, ServerError } from '../../../errors';

const axiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL.DICODING_STORY_API,
});

const Auth = {
  async register({
    name,
    email,
    password,
  }) {
    try {
      const response = await axiosInstance.post(
        ENDPOINT.AUTH.REGISTER(),
        { name, email, password },
      );

      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new APIError(error.response.data.message, error.response.status);
      }

      if (error.response.status < 200 || error.response.status >= 300) {
        throw new ServerError(error.response.statusText, error.response.status);
      }
    }
  },
  async login({
    email,
    password,
  }) {
    try {
      const response = await axiosInstance.post(ENDPOINT.AUTH.LOGIN(), { email, password });

      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new APIError(error.response.data.message, error.response.status);
      }

      if (error.response.status < 200 || error.response.status >= 300) {
        throw new ServerError(error.response.statusText, error.response.status);
      }
    }
  },
};

export default Auth;
