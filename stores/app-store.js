import { writable/* , readable, derive */ } from 'svelte/store'

let initial_search_term = ''
let initial_type = ''
let initial_decade = ''
let initial_subject = ''

if (process.browser) {
	const params = new URLSearchParams((new URL(location)).search)
	initial_search_term = params.get('search_term') || ''
	initial_type = params.get('type') || ''
	initial_decade = params.get('decade') || ''
	initial_subject = params.get('subject') || ''
}
export const search_term = writable(initial_search_term)
export const type = writable(initial_type)
export const decade = writable(initial_decade)
export const subject = writable(initial_subject)

// if (process.env.NODE_ENV === 'development') {
// 	store.set({ dump: json => JSON.stringify(json) })
// 	window.store = store
// }
