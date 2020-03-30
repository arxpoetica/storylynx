import { writable/* , readable, derive */ } from 'svelte/store'

let initial_search_term = ''
if (process.browser) {
	const params = new URLSearchParams((new URL(location)).search)
	initial_search_term = params.get('search_term') || ''
}
export const search_term = writable(initial_search_term)

export const story_scroll = writable(0)
export const root = writable(null)
export const rootMargin = writable('0px')
export const threshold = writable([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])

// if (process.env.NODE_ENV === 'development') {
// 	store.set({ dump: json => JSON.stringify(json) })
// 	window.store = store
// }
