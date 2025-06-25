const BASE_URL = process.env.REACT_APP_BASE_URL

export const userEndpoints = {
  LOGIN_API: BASE_URL + "/users/login",
  SIGNUP_API: BASE_URL + "/users/signup",
  LOGOUT_API: BASE_URL + "/users/logout",
  ADD_ADDRESS_API: BASE_URL + "/users/add-address",
  GET_ADDRESS_API: BASE_URL + "/users/get-address",
  ADD_WISHLIST_API: BASE_URL + "/users/add-wishlist",
  GET_WISHLIST_API: BASE_URL + "/users/get-wishlist",
  REMOVE_FROM_WISHLIST_API: BASE_URL + "/users/remove-from-wishlist",
}

export const posterEndpointsV2 = {
  GET_POSTER_INFO_API: BASE_URL + "/posters/get-poster-info",
  GET_POSTER_API: BASE_URL + "/posters/get-posters",
  GET_CATEGORY_WISE_POSTER_API: BASE_URL + "/posters/get-category-wise-poster",
  GET_SEARCH_POSTER_API: BASE_URL + "/posters/search-posters",
  GET_SUGGEST_POSTER_API: BASE_URL + "/posters/live-search-suggestions",
}


export const orderEndpoints = {
  GET_ORDER_API: BASE_URL + "/orders/my-orders"
}

export const reviewEndpoints = {
  ADD_REVIEW_API: BASE_URL + "/reviews/add-review",
  GET_POSTER_REVIEWS_API: BASE_URL + "/reviews/get-poster-review"
}

export const categoryEndpoints = {
  ADD_CATEGORY_API: BASE_URL + "/category/add-category",
  GET_ALL_CATEGORIES_API: BASE_URL + "/category/get-category"
}

export const cartEndpoints = {
  ADD_CART : BASE_URL + "/cart",
  GET_CART_ITEMS: BASE_URL + "/cart",
  UPDATE_CART_ITEM: BASE_URL + "/cart",
  REMOVE_CART_ITEM: BASE_URL + "/cart",
  CLEAR_CART: BASE_URL + "/cart/clearCart",
}

export const paymentEndpointsV2 = {
  POSTER_PAYMENT_API: BASE_URL + "/payment/create-order",
  POSTER_VERIFY_API: BASE_URL + "/payment/verify-payment"
}