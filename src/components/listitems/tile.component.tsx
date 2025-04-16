import React from 'react';

const styles = {
	Card: {
		top: '964px',
		left: '65px',
		width: '249px',
		height: '294px',
		backgroundColor: '#323232',
		borderRadius: '24px',
	},
	ImageContainer: {
		top: '972px',
		left: '73px',
		width: '233px',
		height: '184px',
		borderRadius: '24px',
		backgroundImage: 'url(./image.jpeg)',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	},
	Title: {
		color: '#ffffff',
		fontSize: '16px',
		fontFamily: 'Roboto',
		fontWeight: 600,
		lineHeight: '24px',
	},
	Latin: {
		color: '#ffffff',
		fontSize: '14px',
		fontFamily: 'Roboto',
		lineHeight: '22px',
	},
	Type: {
		color: '#ffffff',
		fontSize: '12px',
		fontFamily: 'Roboto',
		fontWeight: 300,
		lineHeight: '24px',
	},
	Icon: {
		color: '#ffffff',
		fill: '#ffffff',
		fontSize: '14px',
		top: '1227px',
		left: '288px',
		width: '14px',
		height: '14px',
	},
};

const TileComponent = (props: any) => {
	return (
		<div style={styles.Card} className='roboto-full'>
			<div style={{
				...styles.ImageContainer,
				backgroundImage: `url(https://picsum.photos/id/1/233/184)`,
			}} />
			<div style={styles.Title}>
				{props.text ? props.title : 'Lily of the Valley'}
			</div>
			<div style={styles.Latin}>
				{props.text ? props.latin : 'Convallaria majalis'}
			</div>
			<div style={styles.Type}>
				{props.text ? props.type : 'Flowering Plant'}
			</div>
			<svg style={styles.Icon} viewBox="0 0 320 512">
				<path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
				</path>
			</svg>
		</div>
	);
};

export default TileComponent;