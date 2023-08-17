import { APIError, ServerError } from '../errors';
import Story from '../services/api/dicoding-story-api/Story';
import Loading from '../utils/Loading';
import Modal from '../utils/Modal';

const Index = {
  async init() {
    await this._initStoriesData();
  },

  async _initStoriesData() {
    try {
      Loading.show();
      const stories = await Story.getStories();
      Loading.hide();

      const storiesElem = document.querySelector('story-list');
      storiesElem.setAttribute('stories', JSON.stringify(stories));
    } catch (error) {
      Loading.hide();

      if (error instanceof APIError) {
        return Modal.show(
          'API Error',
          error.message,
        );
      }

      if (error instanceof ServerError) {
        return Modal.show(
          'Server Error',
          'Internal Server Error',
        );
      }

      // eslint-disable-next-line no-console
      console.log(error);
      return Modal.show(
        'Unkown Error',
        'Unknown Error',
      );
    }
  },
};

export default Index;
