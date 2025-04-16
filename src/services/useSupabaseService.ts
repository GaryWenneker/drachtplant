import { IActions, IState } from '../state/actions';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
// import { debounce } from 'lodash'; // Optional: For debouncing
import { supabase } from './supabaseClient'; // Assuming supabaseClient.js is in the same directory

// --- Utility function for handling Supabase errors ---
const handleSupabaseError = (error: PostgrestError | null, operation = 'operation') => {
	if (error) {
		console.error(`Supabase error during ${operation}:`, error);
		return error;
	}
	return null;
};

// --- React Service / Hook ---
const createSupabaseService = (tableName: string) => {
	if (!tableName) {
		throw new Error('Table name must be provided to the createSupabaseService hook.');
	}

	// --- State for unlimited scroll component ---
	const [items, setItems] = useState<any[]>([]);
	const [loadingMore, setLoadingMore] = useState(false);
	const [errorMore, setErrorMore] = useState<PostgrestError | null>(null);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const listRef = useRef<HTMLDivElement | null>(null);

	// --- Fetching suggestions for autocomplete ---
	const fetchAutocompleteSuggestions = useCallback(async (suggestionColumn, query, limit = 10) => {
		if (!query.trim() || !suggestionColumn) {
			return [];
		}
		console.log('Fetching suggestions for query:', tableName, suggestionColumn, query);
		const { data, error } = await supabase
			.from(tableName)
			.select(suggestionColumn)
			.ilike(suggestionColumn, `%${query}%`)
			.limit(limit);

		if (handleSupabaseError(error, 'fetching autocomplete suggestions')) {
			return [];
		}

		console.log('Suggestions fetched:', data);

		// Extract only the suggestion values
		return data?.map(item => item[suggestionColumn]) ?? [];
	}, [tableName]);

	// --- Function to insert data ---
	const insertData = useCallback(async (newData) => {
		const { data, error } = await supabase
			.from(tableName)
			.insert([newData])
			.select(); // Select the newly inserted row

		if (handleSupabaseError(error, 'inserting data')) {
			return null;
		}
		return data ? data[0] : null; // Return the inserted object
	}, [tableName]);

	async function searchByPartialMatch(column: string, pattern: string) {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.like(column, `%${pattern}%`); // % is a wildcard
		if (error) {
			console.error('Error searching:', error);
			return null;
		}
		return data;
	}

	// --- Function to update data ---
	const updateData = useCallback(async (id, updatedData, idColumn = 'id') => {
		const { data, error } = await supabase
			.from(tableName)
			.update(updatedData)
			.eq<string>(idColumn, id)
			.select(); // Select the updated row

		if (handleSupabaseError(error, 'updating data')) {
			return null;
		}
		return data ? data[0] : null; // Return the updated object
	}, [tableName]);

	// --- Function to delete data ---
	const deleteData = useCallback(async (id, idColumn = 'id') => {
		const { data, error } = await supabase
			.from(tableName)
			.delete()
			.eq<string>(idColumn, id)
			.select(); // Select the deleted row (can be empty)

		if (handleSupabaseError(error, 'deleting data')) {
			return false;
		}
		return !!data; // Return true if deletion was successful (data array existed)
	}, [tableName]);

	// --- Function for basic search with exact match ---
	const searchExact = useCallback(async (column, value) => {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.eq<string>(column, value);

		if (handleSupabaseError(error, 'exact search')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Function for basic search with greater than ---
	const searchGreaterThan = useCallback(async (column, value) => {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.gt(column, value);

		if (handleSupabaseError(error, 'greater than search')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Function for search with multiple filters (AND) ---
	const searchMultiple = useCallback(async (filters = {}) => {
		let query = supabase.from(tableName).select('*');
		for (const column in filters) {
			query = query.eq(column, filters[column]);
		}
		const { data, error } = await query;

		if (handleSupabaseError(error, 'multiple filters search')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Function for search with OR conditions ---
	const searchOr = useCallback(async (orConditions) => {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.or(orConditions);

		if (handleSupabaseError(error, 'OR search')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Function for advanced filtering ---
	const filterData = useCallback(async (column, operator, value) => {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.filter(column, operator, value);

		if (handleSupabaseError(error, 'advanced filter')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Function for full-text search ---
	const searchFullText = useCallback(async (column, query, options) => {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.textSearch(column, query, options);

		if (handleSupabaseError(error, 'full-text search')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Function for pattern matching (LIKE) ---
	const searchLike = useCallback(async (column, pattern) => {
		const { data, error } = await supabase
			.from(tableName)
			.select('*')
			.like(column, pattern);

		if (handleSupabaseError(error, 'LIKE search')) {
			return [];
		}
		return data || [];
	}, [tableName]);

	// --- Fetching initial items for unlimited scroll ---
	const fetchInitialItems = useCallback(async (initialPageSize = 20) => {
		setLoadingMore(true);
		setErrorMore(null);
		setPage(0);
		setItems([]);
		setHasMore(true);

		console.log('Fetching initial items:', initialPageSize);

		const startIndex = 0;
		const endIndex = initialPageSize - 1;

		try {
			const { data, error, count } = await supabase
				.from(tableName)
				.select('*', { count: 'exact' })
				.range(startIndex, endIndex);

			if (error) {
				console.error('Error fetching initial items:', error);
				setErrorMore(error);
			} else if (data) {
				console.log('Initial items fetched:', initialPageSize, data);
				setItems(data);
				console.log('items state:', items);
				setHasMore(data.length === initialPageSize && (!count || data.length < count));
				setPage(1);
			}
		} catch (err) {
			setErrorMore(err as PostgrestError);
		} finally {
			setLoadingMore(false);
		}
	}, [tableName]);

	useEffect(() => {
		// Initial fetch when the component mounts
		fetchInitialItems(); // Initial fetch when the service is used
	}, [fetchInitialItems]);

	// --- Fetching more items for unlimited scroll ---
	const fetchMoreItems = useCallback(async (pageSize = 10) => {
		if (loadingMore || !hasMore) return;

		setLoadingMore(true);
		setErrorMore(null);

		const startIndex = page * pageSize;
		const endIndex = (page + 1) * pageSize - 1;

		try {
			const { data, error } = await supabase
				.from(tableName)
				.select('*')
				.range(startIndex, endIndex);

			if (error) {
				setErrorMore(error);
			} else if (data) {
				setItems((prevItems) => [...prevItems, ...data]);
				setHasMore(data.length === pageSize);
				setPage((prevPage) => prevPage + 1);
			}
		} catch (err) {
			setErrorMore(err as PostgrestError);
		} finally {
			setLoadingMore(false);
		}
	}, [tableName, page, loadingMore, hasMore]);

	// --- Handle scroll for unlimited scroll ---
	const handleScroll = useCallback(() => {
		if (listRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = listRef.current;
			if (scrollTop + clientHeight >= scrollHeight - 200) {
				fetchMoreItems();
			}
		}
	}, [fetchMoreItems]);

	// --- Effect to attach scroll listener for unlimited scroll ---
	useEffect(() => {
		const listElement = listRef.current;
		if (listElement) {
			listElement.addEventListener('scroll', handleScroll);
			return () => listElement.removeEventListener('scroll', handleScroll);
		}
	}, [handleScroll]);

	return {
		fetchInitialItems,
		searchByPartialMatch,
		fetchAutocompleteSuggestions,
		insertData,
		updateData,
		deleteData,
		searchExact,
		searchGreaterThan,
		searchMultiple,
		searchOr,
		filterData,
		searchFullText,
		searchLike,
		// For unlimited scroll:
		items,
		setItems,
		page,
		setPage,
		loadingMore,
		errorMore,
		hasMore,
		listRef,
		fetchMoreItems, // Expose fetchMoreItems if you need manual triggering
	};
};

let instance: ReturnType<typeof createSupabaseService> | null = null;
const useSupabaseService = (tableName: string = 'drachtplanten') => {
    if (!instance) {
		console.log('Creating new Supabase service instance for table:', tableName);
        instance = createSupabaseService(tableName);
    } else {
		console.log('Using existing Supabase service instance for table:', tableName);
	}
    return instance;
};

export default useSupabaseService;
