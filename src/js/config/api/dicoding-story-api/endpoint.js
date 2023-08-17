export default {
  AUTH: {
    REGISTER() {
      return '/register';
    },
    LOGIN() {
      return '/login';
    },
  },
  STORY: {
    ALL() {
      return '/stories';
    },
    BY_ID(id) {
      return `/stories/${id}`;
    },
  },
};
