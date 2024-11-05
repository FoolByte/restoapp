import LikeButtonInitiator from '../../src/scripts/utils/like-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/restaurant-idb';

const createLikeButtonPresenterWithMovie = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#favoriteButton'),
    favoriteRestaurants: FavoriteRestaurantIdb,
    restaurant,
  });
};
export { createLikeButtonPresenterWithMovie };
