// Filter.jsx

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={styles.filterContainer}>
    <label>
      Find contacts by name:
      <input
        className={styles.filterInput}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
