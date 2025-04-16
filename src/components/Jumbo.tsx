import React from 'react';

const styles = {
  Card: {
    top: '102px',
    left: '64px',
    width: '1312px',
    height: '290px',
    backgroundColor: 'rgba(50,50,50,0.48)',
    borderRadius: '24px',
  },
};

const Jumbotron = (props:any) => {
  return (
    <div style={{ ...styles.Card, ...props.style }}>
      {props.children}
    </div>
  );
};

export default Jumbotron;