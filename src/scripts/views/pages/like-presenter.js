import { createLikeButtonTemplate, createUnlikeButtonTemplate } from '../templates/template-creator';

const favoriteButtonIntiator = () => {
	async init({favoriteButtonContainer, favoriteRestaurants, restaurant}) {
		this._favoriteButtonContainer = favoriteButtonContainer;
		this._favoritrestaruants = favoriteRestaurants;
		this._restaurant = restaurant;

		await this._renderButton();
	}

	async restaurantExist(id) {
		const restaurant = await this._favoriteMovies.getMovie(id);
		return !!movie;
	  },
}
	