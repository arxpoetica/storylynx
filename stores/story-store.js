import { writable/* , readable, derive */ } from 'svelte/store'
import { storable } from './local-store.js'

export const view_height = writable(0)
export const story_scroll = writable(0)
export const muted = storable('muted', false)
