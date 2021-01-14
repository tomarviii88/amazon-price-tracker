import axios from 'axios';

export const SET_EMAIL = 'SET_EMAIL';
export const SUBSCRIBE_FOR_URL = 'SUBSCRIBE_FOR_URL';

export const setEmail = data => ({
  type: SET_EMAIL,
  data
});

export const subscribeForPriceTracker = data => ({
  type: SUBSCRIBE_FOR_URL,
  data
});

export const fetchRes = async data => {
  console.log('ana');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(data);

  //const urls = JSON.parse(data);
  //console.log(urls);
  console.log(data);
  const res = await axios.post(`http://localhost:3000/getToken`, body, config);
  console.log(res);
};
