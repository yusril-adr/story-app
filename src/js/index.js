// Import our custom CSS
import '../scss/main.scss';

// Import javascript file as needed
// eslint-disable-next-line no-unused-vars
import './components';

// Import javascript file as needed
import Index from './pages/index';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Add from './pages/story/add';
import User from './services/localStorage/User';

const routes = {
  '/': Index,
  '/index.html': Index,
  '/auth/register.html': Register,
  '/auth/login.html': Login,
  '/story/add.html': Add,

};

const currentRoute = window.location.pathname;
const detectRoute = () => routes[currentRoute];

const publicRoutes = [
  '/auth/register.html',
  '/auth/login.html',
];

const secureRoute = () => {
  const user = User.getUser();
  if (!user && !publicRoutes.includes(currentRoute)) {
    window.location.href = '/auth/login.html';
  } else if (user && publicRoutes.includes(currentRoute)) {
    window.location.href = '/';
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  const loadingElem = document.querySelector('loading-screen');
  document.body.removeChild(loadingElem);

  secureRoute();

  const route = detectRoute();
  route.init();
});
