import React from 'react';
import spinner from './assets/spinner.svg';

function Spinner(props) {
  return (
      <img className={props.className} src={spinner}/>
  );
}

export default Spinner;