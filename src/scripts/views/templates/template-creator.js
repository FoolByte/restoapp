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

export { createRestaurantItemTemplate, createHomeTemplate };
