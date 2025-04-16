import { supabase } from "../services/supabaseClient";

export interface IActions {
	setStateValues: (state: any) => void;
	setData: (data: any) => void;
	getData: (initialPageSize?: number) => void;
	search: (searchTerm: string, options?: any) => void;
}

export interface IState {
	data: any[];
	showSearchModal: boolean;
}

export interface IStore {
	state: IState;
	setState: (state: IState) => void;
}

export const setStateValues = (store: IStore, state: any) => {
	store.setState({ ...store.state, ...state });
};

export const setData = (store: IStore, data: any) => {
	store.setState({ ...store.state, data });
};

export const search = async (store: IStore, searchTerm: string, options: any = undefined) => {
	const tableName = "drachtplanten";
	try {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			// .like('nl', `%${searchTerm}%`);
			.or(`latin.ilike.%${searchTerm}%,nl.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`);

		if (error) {
			console.error('Error fetching initial items:', error);
			// setErrorMore(error);
		} else if (data) {
			store.setState({ ...store.state, data, showSearchModal: false });
			// setHasMore(data.length === initialPageSize && (!count || data.length < count));
			// setPage(1);
		}
	} catch (err) {
		// setErrorMore(err as PostgrestError);
	} finally {
		// setLoadingMore(false);
	}
};

export const getData = async (store: IStore, initialPageSize = 5) => {
	const tableName = "drachtplanten";
	const startIndex = 0;
	const endIndex = initialPageSize - 1;
	try {
		const { data, error, count } = await supabase
			.from(tableName)
			.select('*', { count: 'exact' })
			.range(startIndex, endIndex);

		if (error) {
			console.error('Error fetching initial items:', error);
			// setErrorMore(error);
		} else if (data) {
			console.log('Initial items fetched:', initialPageSize, data);
			store.setState({ ...store.state, data });
			// setHasMore(data.length === initialPageSize && (!count || data.length < count));
			// setPage(1);
		}
	} catch (err) {
		// setErrorMore(err as PostgrestError);
	} finally {
		// setLoadingMore(false);
	}
	return store.state.data;
};

const actions = { setStateValues, setData, getData, search }
export default actions;