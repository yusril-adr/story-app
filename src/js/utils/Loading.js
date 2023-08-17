const Loading = {
  show() {
    const loadingElem = document.createElement('loading-screen');
    document.body.appendChild(loadingElem);
  },
  hide() {
    const loadingElem = document.querySelector('loading-screen');
    document.body.removeChild(loadingElem);
  },
};

export default Loading;
