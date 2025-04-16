import React, { useState } from 'react';

import useSupabaseService from '../services/useSupabaseService';

function ListComponent() {
	const {
		searchByPartialMatch,
		fetchAutocompleteSuggestions,
		insertData,
		updateData,
		deleteData,
		searchExact,
		items,
		loadingMore,
		errorMore,
		hasMore,
		listRef,
		// ... other functions
	} = useSupabaseService('drachtplanten'); // Replace with your table name

	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<any[]>([]);
	const [newItem, setNewItem] = useState({ name: '' });

	const handleInputChange = async (e: any) => {
		const query = e.target.value;
		setInputValue(query);
		console.log('Query:', query);
		const fetchedSuggestions = await fetchAutocompleteSuggestions('nl', query); // Replace
		setSuggestions(fetchedSuggestions);
	};

	const handleInsert = async () => {
		const insertedItem = await insertData(newItem);
		if (insertedItem) {
			console.log('Inserted:', insertedItem);
			// Optionally update your local list
		}
	};

	// ... other handlers for update, delete, search

	return (
		<div>
			<h2>Autocomplete</h2>
			<input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search..." />
			<ul>
				{suggestions.map((suggestion, index) => (
					<li key={index}>{suggestion}</li>
				))}
			</ul>

			<h2>Insert New Item</h2>
			<input
				type="text"
				value={newItem.name}
				onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
				placeholder="Item Name"
			/>
			<button onClick={handleInsert}>Insert</button>

			<h2>Unlimited Scroll List</h2>
			<div ref={listRef} style={{ overflowY: 'auto', maxHeight: '300px' }}>
				<ul>
					{items.map((item: any) => (
						<li key={item.id}>{JSON.stringify(item)}</li>
					))}
				</ul>
				{loadingMore && <div>Loading more items...</div>}
				{errorMore && <div>Error loading more: {errorMore.message}</div>}
				{!hasMore && items.length > 0 && <div>No more items.</div>}
			</div>

			<h2>Search Exact</h2>
			<button onClick={async () => {
				const results = await searchExact('name', 'some value');
				console.log('Exact search results:', results);
			}}>Search by Name</button>

			{/* ... use other functions as needed */}
		</div>
	);
}

export default ListComponent;