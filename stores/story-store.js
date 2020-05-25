import { writable/* , readable, derive */ } from 'svelte/store'
import { storable } from './local-store.js'

export const seq_audio = writable({})
export const clip_meta = writable({})
export const view_height = writable(0)
export const story_scroll = writable(0)
export const forward = writable(true)
export const muted = storable('muted', false)
