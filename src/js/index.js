// Import our custom CSS
import '../sass/main.scss';

// Import javascript file as needed
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';
import './components';

// Import javascript file as needed
import Index from './pages/index';
import Add from './pages/story/add';

const routes = {
  '/': Index,
  '/index.html': Index,
  '/story/add.html': Add,

};

const detectRoute = () => routes[window.location.pathname];

window.addEventListener('load', async () => {
  const route = detectRoute();
  route.init();
});
