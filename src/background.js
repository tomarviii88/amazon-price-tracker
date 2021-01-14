import { createStore } from 'redux';
import storeCreatorFactory from 'reduxed-chrome-storage';
import reducers from './reducers';
import { fetchRes } from './actions/data';

const storeCreator = storeCreatorFactory({ createStore });
let store;

const getStore = async () => {
  if (store) return store;
  store = await storeCreator(reducers);
  return store;
};

chrome.runtime.onStartup.addListener(async () => {
  const store = await getStore();
  console.log(store);
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  chrome.alarms.create('', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener(async alarm => {
  console.log(alarm.name); // refresh
  //helloWorld();
  const store = await getStore();
  const state = await store.getState();
  const { data } = state;
  fetchRes(data.amazon_urls);
});

chrome.tabs.onActivated.addListener(async d => {
  const { tabId } = d;
  if (!tabId) return;
  const store = await getStore();
  const state = store.getState();
  const { data } = state;
  console.log(data);
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const url = tabs[0].url;
    //setUrl(url);
    console.log(url);
  });
});
