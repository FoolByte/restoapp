import Utils from '../../utils/utils.js';
import { createDetailTemplate } from '../templates/template-creator.js';
import UrlParser from '../../routes/url-parser.js';
import RestaurantApi from '../../data/restaurant-api.js';
import FavoriteRestaurantIdb from '../../data/restaurant-idb.js';
import LikeButtonInitiator from '../../utils/like-presenter.js';

import swal from 'sweetalert';

const url = UrlParser.parseActiveUrlWithoutCombiner();

const Detail = {
  async render() {
    return `
      <section id="restaurant-detail-container">
        <a href="#/detail/${url.id}" class="skip-to-content" tabindex="1">Skip to Content</a>
        <loading-element></loading-element>
        <div id="restaurant-detail"></div>
        <div id="favoriteButton"></div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const alretTimer = 1500;
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantApi.detail(url.id);
      const restaurantDetailContainer = document.querySelector('#restaurant-detail');
      restaurantDetailContainer.innerHTML = createDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#favoriteButton'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
        },
      });

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
          id: url.id,
          name: reviewNameInput.value,
          review: reviewTextInput.value,
        };
        console.log(reviewData);
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
    } catch (error) {
      console.error('Gagal memuat data detail restoran:', error);
      const restaurantDetailContainer = document.getElementById('restaurant-detail');
      restaurantDetailContainer.innerHTML = '<p>Terjadi kesalahan saat memuat detail restoran.</p>';
    }
  },
};

export default Detail;
