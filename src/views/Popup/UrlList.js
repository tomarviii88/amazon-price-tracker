import React from 'react';
import styles from './urllist.module.css';
import { X, ExternalLink } from 'react-feather';

const UrlList = ({ item, onDeleteItem }) => {
  const deleteThisItem = () => {
    onDeleteItem(item.id);
  };

  return (
    <div className={styles.row}>
      <div className={styles.item}>
        {item.item_name} - {item.budget}
      </div>
      <div className={styles.options}>
        <a href={item.url} target='_blank' className={styles.href}>
          <ExternalLink size={16} />
        </a>
        <X size={16} onClick={deleteThisItem} />
      </div>
    </div>
  );
};

export default UrlList;
