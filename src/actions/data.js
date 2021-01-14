import axios from 'axios';

export const SET_EMAIL = 'SET_EMAIL';
export const TRACK_ITEM = 'TRACK_ITEM';
export const DELETE_ALL_ITEM = 'DELETE_ALL_ITEM';
export const DELETE_ITEM_TRACKING = 'DELETE_ITEM_TRACKING';

export const setEmail = data => ({
  type: SET_EMAIL,
  data
});

export const subscribeForPriceTracker = data => ({
  type: TRACK_ITEM,
  data
});

export const deleteItemTracking = data => ({
  type: DELETE_ITEM_TRACKING,
  data
});

export const deleteAllItems = () => ({
  type: DELETE_ALL_ITEM
});
export const fetchRes = async data => {
  console.log('ana');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(data);
  console.log(data);
  const res = await axios.post(`http://localhost:3000/getToken`, body, config);
  console.log(res);
};
