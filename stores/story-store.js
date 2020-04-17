import { writable/* , readable, derive */ } from 'svelte/store'
import { storable } from './local-store.js'

export const story_scroll = writable(0)
export const root = writable(null)
export const rootMargin = writable('0px')
export const threshold = writable([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])

export const volume = storable('volume', 1)
