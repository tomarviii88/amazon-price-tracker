import { SET_EMAIL, SUBSCRIBE_FOR_URL } from '../actions/data';

const initialState = {
  email: '',
  amazon_urls: []
};

export default function(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_EMAIL:
      console.log(data);
      return {
        ...state,
        email: data
      };
    case SUBSCRIBE_FOR_URL:
      return {
        ...state,
        amazon_urls: [...state.amazon_urls, data]
      };
    default:
      return state;
  }
}
