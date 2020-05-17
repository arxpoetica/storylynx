import { writable } from 'svelte/store'

export const Quill = writable(null)
export const FileStackLoaded = writable(false)
export const content_vars = writable()

export const assets = writable([])
export const playground = writable([])
export const groups = writable([])
