/*global chrome*/
import React, { useEffect, useState } from 'react';
import './App.css';
import { setEmail, subscribeForPriceTracker } from '../../actions/data';
import { connect } from 'react-redux';

const App = props => {
  const [url, setUrl] = useState('');
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
    props.subscribeForPriceTracker(url);
  };

  return (
    <div>
      <h1>Amazon Price Tracker</h1>
      <p>{url}</p>
      <input
        type='text'
        placeholder='Enter email'
        value={props.data.email}
        onChange={onChangeEmail}
      />
      <button onClick={onSubscribe}>Subscribe for this tab</button>
      <ul>
        {props.data.amazon_urls.map(url => {
          return <li>{url}</li>;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { setEmail, subscribeForPriceTracker })(
  App
);
