import { IActions, IState } from '../../state/actions';
import React, { useEffect } from 'react';

import PlantCard from './plant.card.tile.component';
import { useReactHookz } from '../../state';
import useSupabaseService from '../../services/useSupabaseService';

interface PlantCardTileGridProps {
	// Add your props here
}

const styles = {
	Screen: {
		display: 'flex',
		// position: 'relative' as const,
		// flexDirection: 'row' as const,
		flexFlow: 'row wrap',
		justifyContent: 'flex-start',
		alignItems: 'left',
		alignSelf: 'auto',
		// height: '100vh',

	}
}

export const PlantCardTileGridComponent: React.FC<PlantCardTileGridProps> = (props: any) => {
const [{ data }, actions]: [IState, IActions] = useReactHookz();
	return (
		<>
			<div className='plant-card-grid' style={styles.Screen}>
				{Array.from(data).map((_, index) => (
					// <div key={index}>x</div>
					<PlantCard {..._} key={index} />
				))}
			</div>
		</>
	);
};

export default PlantCardTileGridComponent;