import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-idb';

import * as TestFactories from './helper/testFactories';

describe('Add restaurant to favorite', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButton"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the add to favorite button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="Tambahkan restoran ke favorit"]')).toBeTruthy();
  });

  it('should show the favorite button when the restaurant has been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    expect(document.querySelector('[aria-label="Hapus dari favorit"]')).toBeFalsy();
  });

  it('should be able to click the add to favorite button to add favorite restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has already been favorited', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({});
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
