import React from 'react';

interface RowProps {
	children?: React.ReactNode;
}

const styles = {
	position: 'relative' as const,
};

const RowComponent: React.FC<RowProps> = ({ children }) => {
	return (
		<div className="-mx-4 flex flex-wrap justify-center" style={styles}>
			<div className="w-full px-4">
				{children}
			</div>
		</div>
	);
};

export default RowComponent;