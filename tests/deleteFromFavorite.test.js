import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-idb';

import * as TestFactories from './helper/testFactories';

describe('Delete restaurant from favorite', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButton"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show the favorite button when the restaurant has been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="Hapus dari favorit"]')).toBeTruthy();
  });

  it('should not show the add to favorite button when the restaurant has favorited', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="Tambahkan restoran ke favorit"]')).toBeFalsy();
  });

  it('should be able to click the favorited button to delete restaurant from favorite', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="Hapus dari favorit"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
