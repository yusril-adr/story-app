import Story from '../services/api/Story';

const Index = {
  async init() {
    await this._initStoriesData();
  },

  async _initStoriesData() {
    const stories = await Story.getStories();

    const storiesElem = document.querySelector('story-list');
    storiesElem.setAttribute('stories', JSON.stringify(stories));
  },
};

export default Index;
