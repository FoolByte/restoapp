Feature('Add Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('sending review', async ({ I }) => {
  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-item').first();

  I.click(firstRestaurant);

  I.waitForElement('#review-form', 5);
  I.seeElement('#review-form');
  I.seeElement('#customer-reviews');
  I.seeElement('#submit-review-button');

  const reviewName = 'Budi';
  const reviewText = 'testing e2e';

  I.fillField('#review-name', reviewName);
  I.fillField('#review-text', reviewText);
  I.click('#submit-review-button');

  I.waitForElement('#customer-reviews li', 5);

  I.see(reviewName, '#customer-reviews');
  I.see(reviewText, '#customer-reviews');
});
