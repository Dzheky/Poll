import React, {Fragment} from 'react';
import styles from './RadioButton.module.css';

function RadioButton({label, ...props}) {
  return (
      <label className={styles.container}>
        <input type="radio" {...props}/>
        <span className={styles.pseudoRadio}/>
        {label}
      </label>
  );
}

export default RadioButton;