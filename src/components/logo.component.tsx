import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '24px',
    fontFamily: 'Source Sans Pro',
    fontWeight: 600,
    lineHeight: '36px',
  },
};

const defaultProps = {
  text: 'PlantExplorer',
};

const LogoComponent = (props: any) => {
  return (
    <svg width="300" height="36" viewBox="0 0 300 36" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2,18)">
        <g id="hexagon" transform="translate(0,-18)">
          <polygon points="18,0 31.1769,9 31.1769,27 18,36 4.8231,27 4.8231,9" stroke="#FFFF00" strokeWidth="8" fill="none" />
        </g>
        <g id="text" transform="translate(0,0)">
          <text
            x="43.1769"
            y="10"
            fontSize="36"
            fill="#4682B4"
            fontFamily="Roboto, sans-serif"
            fontWeight="bold"
          >
            DRACHTPLANT
          </text>
        </g>
      </g>
    </svg>
  );
};

export default LogoComponent;