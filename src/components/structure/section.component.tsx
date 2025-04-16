import React from 'react';

interface SectionProps {
	children?: React.ReactNode;
}

const styles = {
	position: 'relative' as const,
};

export const SectionComponent: React.FC<SectionProps> = ({ children }) => {
	return (
		<section className='o-wrapper o-container--max-width' style={styles}>
			{children}
		</section>
	);
};

export default SectionComponent;