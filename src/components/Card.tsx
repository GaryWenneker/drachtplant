import React from 'react';

const styles = {
  Card: {
    top: '352px',
    left: '298px',
    width: '844px',
    height: '80px',
    backgroundColor: '#323232',
    borderRadius: '100px',
  },
};

const Card = (props: any) => {
  return (
    <>
      <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12'>
        <div style={styles.Card} className='roboto-full'>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Card;