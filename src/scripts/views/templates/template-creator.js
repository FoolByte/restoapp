import CONFIG from '../../globals/config.js';

const createRestaurantItemTemplate = (restaurant) => `
   <div class="restaurant-item" tabindex="0" data-id="${restaurant.id}" aria-label="${restaurant.name} restaurant di kota ${restaurant.city} dengan rating ${restaurant.rating}">
         <img class="restaurant-image" src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="restaurant ${restaurant.name}">
         <div class="restaurant-info">
            <h2>${restaurant.name}</h2>
            <p class="city">Kota: ${restaurant.city}</p>
            <p class="rating">Rating: ${restaurant.rating}</p>
         </div>
   </div>
`;

const createHomeTemplate = () => `
   <section id="restaurant-list">
      <h1 id="explore">Explore Restaurant</h1>
      <loading-element></loading-element>
   </section>
`;

const createDetailTemplate = (restaurant) => `

   <div class="restaurant-container">
      <div id="detail-restaurant-image">
      <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
      <h2>${restaurant.name}</h2>
      </div>
      <p tabindex="0 id"focus2">${restaurant.description}</p>
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

const createLikeButtonTemplate = () => `
   <button id="like" aria-label="Tambahkan restoran ke favorit" class="favorite-button">
      <svg xmlns="http://www.w3.org/alretTimer/svg" width="42" height="32" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
      </svg>
   </button>   
`;

const createUnlikeButtonTemplate = () => `
   <button id="unlike" aria-label="Hapus dari favorit" class="favorite-button" >
     <svg xmlns="http://www.w3.org/alretTimer/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,69.05l13.09-12.19A58,58,0,0,1,240,98Z"></path></svg>
   </button>   
`;

export { createRestaurantItemTemplate, createHomeTemplate, createDetailTemplate, createLikeButtonTemplate, createUnlikeButtonTemplate };
