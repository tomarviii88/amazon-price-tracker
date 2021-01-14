/*global chrome*/
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import {
  setEmail,
  subscribeForPriceTracker,
  deleteAllItems,
  deleteItemTracking
} from '../../actions/data';
import { connect } from 'react-redux';
import UrlList from './UrlList';
import { Plus } from 'react-feather';
import { v4 as uuid } from 'uuid';

const App = props => {
  const [url, setUrl] = useState('');
  const [openTrackForm, setOpenTrackForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [budget, setBudget] = useState(null);
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, tabs => {
        const url = tabs[0].url;
        setUrl(url);
      });
  }, []);

  const onChangeEmail = e => {
    props.setEmail(e.target.value);
  };

  const onSubscribe = () => {
    if (budget != null && itemName !== '') {
      let data = {
        id: uuid(),
        url,
        item_name: itemName,
        budget: budget
      };
      props.subscribeForPriceTracker(data);
      toggleTrack();
    }
  };

  const onDeleteAll = () => {
    props.deleteAllItems();
  };

  const toggleTrack = () => {
    setOpenTrackForm(!openTrackForm);
  };

  const onDeleteItem = id => {
    props.deleteItemTracking(id);
  };

  return (
    <div className={styles.chrome_container}>
      <div className={styles.header}>
        <h1>Amazon Price Tracker</h1>
      </div>
      <div className={styles.chrome_body}>
        <div className={styles.table_view}>
          {props.data.amazon_urls.map(item => {
            return <UrlList item={item} onDeleteItem={onDeleteItem} />;
          })}
        </div>
        {openTrackForm ? (
          <div className={styles.track_form}>
            <input
              type='text'
              placeholder='Item Name'
              className={styles.input}
              value={itemName}
              onChange={e => {
                setItemName(e.target.value);
              }}
            />
            <input
              type='number'
              placeholder='Your budget'
              className={styles.input}
              value={budget}
              onChange={e => {
                setBudget(e.target.value);
              }}
            />
            <div className={styles.row}>
              <button className={styles.button1} onClick={onSubscribe}>
                Track
              </button>
              <button onClick={toggleTrack} className={styles.button2}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.track} onClick={toggleTrack}>
              <Plus size={18} /> Track this item
            </div>
            {props.data.amazon_urls.length > 0 && (
              <div className={styles.track} onClick={onDeleteAll}>
                Delete All
              </div>
            )}
          </>
        )}
        <div className={styles.row_input}>
          <div className={styles.track_button}>Email</div>
          <input
            type='text'
            placeholder='Enter email'
            value={props.data.email}
            onChange={onChangeEmail}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, {
  setEmail,
  subscribeForPriceTracker,
  deleteAllItems,
  deleteItemTracking
})(App);
