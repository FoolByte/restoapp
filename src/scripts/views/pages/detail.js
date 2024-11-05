import Utils from '../../utils/utils.js';
import CONFIG from '../../globals/config.js';
import UrlParser from '../../routes/url-parser.js';
import RestaurantApi from '../../data/restaurant-api.js';
import FavoriteRestaurantIdb from '../../data/restaurant-idb.js';

import swal from 'sweetalert';

const Detail = {
  async render() {
    return `
      <section id="restaurant-detail-container">
        <loading-element></loading-element>
        <div id="restaurant-detail"></div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const alretTimer = 1500;
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurantId = url.id;
      console.log(restaurantId);

      const restaurant = await RestaurantApi.detail(restaurantId);
      const restaurantDetailContainer = document.getElementById('restaurant-detail');

      restaurantDetailContainer.innerHTML = `
       <a href="#/detail/${restaurant.id}" class="skip-to-content" tabindex="1">Skip to Content</a>
        <div class="restaurant-container">
          <div id="detail-restaurant-image">
            <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
            <h2>${restaurant.name}</h2>
          </div>
          <p tabindex="0 id"focus2">${restaurant.description}</p>
          <button id="favorite-button" aria-label="Tambahkan restoran ke favorit">
          <svg xmlns="http://www.w3.org/alretTimer/svg" width="40" height="40" fill="#ffffff" viewBox="0 0 256 256">
            <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
          </svg>
         </button>
          <div class="restaurant-info">
            <p><strong>Alamat:</strong> ${restaurant.address}</p>
            <p><strong>Kota:</strong> ${restaurant.city}</p>
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
          </div>
          <div>
            <h3 tabindex="0">Menu Makanan</h3>
            <ul class="menu-list">
              ${restaurant.menus.foods.map((food) => `<li tabindex="0">${food.name}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h3 tabindex="0">Menu Minuman</h3>
            <ul class="menu-list">
              ${restaurant.menus.drinks.map((drink) => `<li tabindex="0">${drink.name}</li>`).join('')}
            </ul>
          </div>
          <div id="review-form">
            <div id="customer-reviews-list">
            <h3 tabindex="0">Customer Reviews</h3>
            <ul>
              ${restaurant.customerReviews.map((review) => `<li tabindex="0"><p><strong>${review.name}</strong> (${review.date}): ${review.review}</p></li>`).join('')}
            </ul>
          </div>
            <h3 tabindex="0">Add Review</h3>
            <input type="text" id="review-name" placeholder="Nama Anda" required />
            <textarea id="review-text" placeholder="Tulis review..." required></textarea>
            <button id="submit-review-button">Kirim Review</button>
          </div>
        </div>
      `;

      Utils.hideLoading();

      const submitReviewButton = document.getElementById('submit-review-button');
      const reviewNameInput = document.getElementById('review-name');
      const reviewTextInput = document.getElementById('review-text');
      const skip = document.querySelector('.skip-to-content');
      const focusElement = document.querySelector('p');

      skip.addEventListener('click', () => {
        focusElement.focus();
      });
      submitReviewButton.addEventListener('click', async () => {
        const reviewData = {
          id: restaurantId,
          name: reviewNameInput.value,
          review: reviewTextInput.value,
        };
        Utils.clearInputFields(reviewNameInput, reviewTextInput);
        try {
          const response = await fetch('https://restaurant-api.dicoding.dev/review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
          });

          const result = await response.json();

          if (!result.error) {
            console.log(result.message);
            swal({
              title: 'Review Terkirim',
              icon: 'success',
              button: false,
              timer: alretTimer,
            });

            const customerReviewsList = document.getElementById('customer-reviews-list').querySelector('ul');
            const newReviewItem = document.createElement('li');
            newReviewItem.innerHTML = `<p><strong>${reviewData.name}</strong> (${new Date().toLocaleDateString()}): ${reviewData.review}</p>`;
            customerReviewsList.appendChild(newReviewItem);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });

      const favoriteButton = document.getElementById('favorite-button');
      let isFavorited = (await FavoriteRestaurantIdb.getRestaurant(restaurant.id)) !== undefined;
      updateFavoriteButtonIcon(isFavorited);

      favoriteButton.addEventListener('click', async () => {
        isFavorited = !isFavorited;

        if (isFavorited) {
          await FavoriteRestaurantIdb.putRestaurant(restaurant);
          console.log('added to favorite');
          swal({
            title: 'Ditambahkan ke Favorit',
            icon: 'success',
            button: false,
            timer: alretTimer,
          });
        } else {
          await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
          console.log('deleted from favorite');
          swal({
            title: 'Dihapus dari Favorit',
            icon: 'success',
            button: false,
            timer: alretTimer,
          });
        }

        updateFavoriteButtonIcon(isFavorited);
      });

      function updateFavoriteButtonIcon(isFavorited) {
        favoriteButton.setAttribute('aria-label', isFavorited ? 'Hapus dari favorit' : 'Tambahkan restoran ke favorit');

        favoriteButton.innerHTML = isFavorited
          ? '<svg xmlns="http://www.w3.org/alretTimer/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,69.05l13.09-12.19A58,58,0,0,1,240,98Z"></path></svg>'
          : '<svg xmlns="http://www.w3.org/alretTimer/svg" width="40" height="40" fill="#ffffff" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path></svg>';
      }
    } catch (error) {
      console.error('Gagal memuat data detail restoran:', error);
      const restaurantDetailContainer = document.getElementById('restaurant-detail');
      restaurantDetailContainer.innerHTML = '<p>Terjadi kesalahan saat memuat detail restoran.</p>';
    }
  },
};

export default Detail;
