import FavoriteRestaurantIdb from '../../data/restaurant-idb.js';
import { createRestaurantItemTemplate } from '../templates/template-creator.js';
import Utils from '../../utils/utils.js';

const Favorite = {
  async render() {
    return `
      <div id="restaurants"></div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const restaurantsContainer = document.getElementById('restaurants');

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = '<p>Tidak ada restoran yang difavoritkan.</p>';
        return;
      }

      restaurantsContainer.innerHTML = restaurants.map(createRestaurantItemTemplate).join('');

      const restaurantItems = document.querySelectorAll('.restaurant-item');
      restaurantItems.forEach((item) => {
        item.addEventListener('click', () => {
          const restaurantId = item.getAttribute('data-id');
          Utils.navigateToDetail(restaurantId);
        });
      });
    } catch (error) {
      console.error('Gagal memuat data restoran favorit:', error);
      const restaurantsContainer = document.getElementById('restaurants');
      restaurantsContainer.innerHTML = '<p>Terjadi kesalahan saat memuat restoran favorit.</p>';
    } finally {
      Utils.hideLoading();
    }
  },
};

export default Favorite;
