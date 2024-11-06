const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorite restaurants', ({ I }) => {
  I.see('Tidak ada restoran yang difavoritkan.', '.restaurant-item__not__found');
});

Scenario('Adding restaurant to favorite', async ({ I }) => {
  I.see('Tidak ada restoran yang difavoritkan.', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-item').first();
  const firstRestaurantId = await I.grabAttributeFrom(firstRestaurant, 'data-id');

  I.click(firstRestaurant);

  I.waitForElement('.favorite-button', 5);
  I.seeElement('.favorite-button');

  I.click('.favorite-button');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoriteRestaurantId = await I.grabAttributeFrom('.restaurant-item', 'data-id');
  assert.strictEqual(firstRestaurantId, favoriteRestaurantId);
});

Scenario('Deleting restaurant from favorite', async ({ I }) => {
  I.see('Tidak ada restoran yang difavoritkan.', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-item').first();
  const firstRestaurantId = await I.grabAttributeFrom(firstRestaurant, 'data-id');

  I.click(firstRestaurant);

  I.waitForElement('.favorite-button', 5);
  I.seeElement('.favorite-button');

  I.click('.favorite-button');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoriteRestaurantId = await I.grabAttributeFrom('.restaurant-item', 'data-id');
  assert.strictEqual(firstRestaurantId, favoriteRestaurantId);

  I.click(firstRestaurant);

  I.waitForElement('.favorite-button', 5);
  I.seeElement('.favorite-button');

  I.click('.favorite-button');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restoran yang difavoritkan.', '.restaurant-item__not__found');
});
