// Configuration
import API_ENDPOINT from '../../global/API_ENDPOINT';

// Errors
import { APIError } from '../../errors';

const Story = {
  async getStories() {
    const response = await fetch(API_ENDPOINT.STORY.GET_STORIES);
    const responseJSON = await response.json();

    if (response.status < 200 || response.status > 299) {
      throw new APIError(responseJSON.message || responseJSON.error);
    }

    return responseJSON.listStory;
  },
};

export default Story;
