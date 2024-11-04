const DrawerInitiator = {
  init({ button, drawer }) {
    button.addEventListener('click', () => {
      const isVisible = drawer.classList.toggle('visible');

      document.body.style.overflow = isVisible ? 'hidden' : 'auto';

      if (isVisible) {
        button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        button.setAttribute('aria-expanded', 'true');
      } else {
        button.innerHTML = '<i class="fa-solid fa-bars"></i>';
        button.setAttribute('aria-expanded', 'false');
      }
    });

    const navHome = document.querySelector('#nav-home');
    const navFavorite = document.querySelector('#nav-favorite');

    navHome.addEventListener('click', () => {
      if (drawer.classList.contains('visible')) {
        button.click();
      }
    });

    navFavorite.addEventListener('click', () => {
      if (drawer.classList.contains('visible')) {
        button.click();
      }
    });
  },
};

export default DrawerInitiator;
