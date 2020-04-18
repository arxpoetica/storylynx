import { writable/* , readable, derive */ } from 'svelte/store'
import { storable } from './local-store.js'

export const story_scroll = writable(0)
export const volume = storable('volume', 1)
