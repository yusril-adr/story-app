// Packages
import axios from 'axios';

// Configuration
import CONFIG from '../../../config/config';
import ENDPOINT from '../../../config/api/dicoding-story-api/endpoint';

// Errors
import { APIError, ServerError } from '../../../errors';

// Utils
import Token from '../../localStorage/Token';

const axiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL.DICODING_STORY_API,
});

const Story = {
  async getStories(page = undefined) {
    try {
      const response = await axiosInstance.get(ENDPOINT.STORY.ALL(), {
        params: {
          page,
        },
        headers: {
          Authorization: `Bearer ${Token.getToken()}`,
        },
      });

      return response.data.listStory;
    } catch (error) {
      if (error.response.data.error) {
        throw new APIError(error.response.data.message, error.response.status);
      }

      if (error.response.status < 200 || error.response.status >= 300) {
        throw new ServerError(error.response.statusText, error.response.status);
      }
    }
  },
  async createStory(formData) {
    try {
      const response = await axiosInstance.post(ENDPOINT.STORY.ALL(), formData, {
        headers: {
          Authorization: `Bearer ${Token.getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.listStory;
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

export default Story;
