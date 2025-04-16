import { IActions, IState } from '../../state/actions';
import React, { useEffect, useState } from 'react';

import { on } from 'events';
import { useReactHookz } from '../../state';

interface SearchDialogProps {
}

export const SearchDialogComponent: React.FC<SearchDialogProps> = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [state, actions]: [IState, IActions] = useReactHookz();
	useEffect(() => {
		const input = document.getElementById(':R2dja:-input') as HTMLInputElement;
		if (input) {
			input.focus();
		}
	}, []);
	return (
		<>
			<div className="fixed inset-0 z-50" id="headlessui-dialog-:r1d:" role="dialog" tabIndex={-1} aria-modal="true" data-headlessui-state="open" data-open="" onClick={(e) => { actions.setStateValues({ showSearchModal: false }); }}>
				<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
				<div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
					<div className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700" id="headlessui-dialog-panel-:r1k:" data-headlessui-state="open" data-open="">
						<div role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-labelledby=":R2dja:-label"><form action="" role="search"><div className="group relative flex h-12">
							<svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute top-0 left-4 h-full w-5 fill-slate-400 dark:fill-slate-500">
								<path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z">
								</path>
							</svg>
							<input  defaultValue={searchTerm} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setSearchTerm(e.currentTarget.value); console.log(e.currentTarget.value); actions.search(e.currentTarget.value) }}}
							data-autofocus="true" className="flex-auto appearance-none bg-transparent pl-12 text-slate-900 outline-hidden placeholder:text-slate-400 focus:w-full focus:flex-none sm:text-sm dark:text-white [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-search-decoration]:hidden [&amp;::-webkit-search-results-button]:hidden [&amp;::-webkit-search-results-decoration]:hidden pr-4" aria-autocomplete="both" aria-labelledby=":R2dja:-label" id=":R2dja:-input" autoComplete="off" autoCorrect="off" autoCapitalize="off" enterKeyHint="search" spellCheck="false" placeholder="Zoeken naar..." maxLength={512} type="search" />
						</div>
							<div className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800">
							</div>
						</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};