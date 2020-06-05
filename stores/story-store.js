import { writable } from 'svelte/store'
import { storable } from './special-store.js'

export const navigation = writable([])

export const seq_audio = writable({})
export const seq_stack = writable({})
export const view_height = writable(0)
export const story_scroll = writable(0)
export const forward = writable(true)
export const muted = storable('muted', false)
