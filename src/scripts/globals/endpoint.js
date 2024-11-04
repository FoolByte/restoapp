import CONFIG from '../globals/config';

const API_ENDPOINT = {
  RESTAURANT: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  REVIEWS: (id) => `${CONFIG.BASE_URL}review/${id}`,
};

export default API_ENDPOINT;
