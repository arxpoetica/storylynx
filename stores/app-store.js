import { writable/* , readable, derive */ } from 'svelte/store'
import { storable } from './special-store.js'

export const color_scheme = storable('color.scheme', 'auto')

export const type = writable('')
export const decade = writable('')
export const subject = writable('')
export const search_term = writable('')
