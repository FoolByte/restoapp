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

const createLikeButtonTemplate = () => `
   <button id="like" aria-label="Tambahkan restoran ke favorit" class="favorite-button">
      <svg xmlns="http://www.w3.org/alretTimer/svg" width="40" height="40" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
      </svg>
   </button>   
`;

const createUnlikeButtonTemplate = () => `
   <button id="unlike" aria-label="Hapus dari favorit" class="favorite-button" >
     <svg xmlns="http://www.w3.org/alretTimer/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,69.05l13.09-12.19A58,58,0,0,1,240,98Z"></path></svg>
   </button>   
`;

export { createRestaurantItemTemplate, createHomeTemplate, createLikeButtonTemplate, createUnlikeButtonTemplate };
