import RestaurantApi from '../../data/restaurant-api.js';
import { createRestaurantItemTemplate } from '../templates/template-creator.js';
import Utils from '../../utils/utils.js';

const Home = {
  async render() {
    return `
      <a href="#focus" class="skip-to-content" tabindex="1">Skip to Content</a>
      <section id="jumbotron">
        <div class="hero">
          <picture>
            <source
              media="(max-width: 600px)"
              srcset="./images/resized/hero-image_2-small.webp"
            />
            <img
              src="./images/resized/hero-image_2-large.jpg"
              alt="Hero image berisi foto makanan di meja makan"
              tabindex="0"
              id="hero"
            />
          </picture>
        </div>
      </section>

      <section id="restaurant-list">
        <h1 id="focus">Explore Restaurant</h1>
        <loading-element></loading-element>
        <div id="restaurants" tabindex="0"></div> 
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await RestaurantApi.restaurantList();
      const restaurantsContainer = document.getElementById('restaurants');

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = '<p>Tidak ada restoran yang tersedia.</p>';
        return;
      }

      restaurantsContainer.innerHTML = restaurants.map(createRestaurantItemTemplate).join('');

      const restaurantItems = document.querySelectorAll('.restaurant-item');
      restaurantItems.forEach((item) => {
        item.setAttribute('aria-label', 'klik utnuk detail restoran');
        item.addEventListener('click', () => {
          const restaurantId = item.getAttribute('data-id');
          Utils.navigateToDetail(restaurantId);
        });

        item.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const restaurantId = item.getAttribute('data-id');
            Utils.navigateToDetail(restaurantId);
          }
        });
      });
    } catch (error) {
      console.error('Gagal memuat data restoran:', error);
      const restaurantsContainer = document.getElementById('restaurants');
      restaurantsContainer.innerHTML = '<p>Terjadi kesalahan saat memuat restoran.</p>';
    } finally {
      Utils.hideLoading();
    }
  },
};

export default Home;
