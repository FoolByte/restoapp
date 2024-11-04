import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/detail.css';
import '../styles/responsive.css';
import '../styles/font.css';

import './component/footer-bar.js';
import './component/loading.js';

import App from './views/app.js';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#drawer-button'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#main-content'),
});

const closeDrawer = () => {
  const drawer = document.querySelector('#drawer');
  drawer.classList.remove('open');
};

const navHome = document.querySelector('#nav-home');
const navFavorite = document.querySelector('#nav-favorite');

navHome.addEventListener('click', () => {
  closeDrawer();
  window.location.hash = '#/home';
});

navFavorite.addEventListener('click', () => {
  closeDrawer();
  window.location.hash = '#/favorite';
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
