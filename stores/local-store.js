import { writable } from 'svelte/store'

/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key		- `localStorage` key
 * @param {any} value		- default value (loads value first from `localStorage` if present)
 * @param {Function} fn		- handed off to `writable`
 */

/* global localStorage */
const storage = typeof localStorage !== 'undefined' ? localStorage : { removeItem: () => {} }
export const storable = (key, value, fn) => {
	key = `lynx.store.${key}`
	if (storage[key]) { value = JSON.parse(storage[key]) }

	const store = writable(value, fn)
	store.subscribe(value => {
		if (value === undefined) {
			storage.removeItem(key)
		} else {
			storage[key] = JSON.stringify(value)
		}
	})

	store.remove = () => store.set(undefined)

	return store
}
