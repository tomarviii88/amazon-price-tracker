import {
  SET_EMAIL,
  DELETE_ALL_ITEM,
  TRACK_ITEM,
  DELETE_ITEM_TRACKING
} from '../actions/data';

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
    case TRACK_ITEM:
      return {
        ...state,
        amazon_urls: [...state.amazon_urls, data]
      };
    case DELETE_ALL_ITEM:
      return {
        ...state,
        amazon_urls: []
      };
    case DELETE_ITEM_TRACKING:
      return {
        ...state,
        amazon_urls: state.amazon_urls.filter(item => {
          if (item.id !== data) return item;
        })
      };
    default:
      return state;
  }
}
