/* global window */
import { writable } from 'svelte/store'

/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key		- `localStorage` key
 * @param {any} value		- default value (loads value first from `localStorage` if present)
 * @param {string} type		- specify the variable type (`Set`, `Array`, etc.)
 * @param {Function} fn		- handed off to `writable`
 */

export const storable = (key, value, type, fn) => {

	// quick guard against server
	if (process.server) { return writable(value, fn) }

	key = `lynx.store.${key}`
	if (window.localStorage[key]) {
		if (type === 'Set') {
			value = new Set(JSON.parse(window.localStorage[key]))
		} else {
			value = JSON.parse(window.localStorage[key])
		}
	}

	const store = writable(value, fn)
	store.subscribe(value => {
		if (value === undefined) {
			window.localStorage.removeItem(key)
		} else {
			if (type === 'Set') {
				window.localStorage[key] = JSON.stringify([...value])
			} else {
				window.localStorage[key] = JSON.stringify(value)
			}
		}
	})

	store.remove = () => store.set(undefined)

	return store
}
