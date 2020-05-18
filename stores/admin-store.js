import { writable } from 'svelte/store'

export const Quill = writable(null)
export const FileStackLoaded = writable(false)
export const content_vars = writable()

export const assets = writable([])
export const current_group = writable(-1)
export const groups = writable([])
export const nest_saved = writable(true)
