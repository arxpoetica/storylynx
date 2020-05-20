import { writable } from 'svelte/store'

export const Quill = writable(null)
export const FileStackLoaded = writable(false)
export const content_vars = writable()

export const saving = writable(false)
export const saveable = writable(false)

export const hot = writable(null)
export const hot_loaded = writable(null)
export const hot_changes = writable([])

export const assets = writable([])
export const current_group = writable(-1)
export const groups = writable([])
export const egg_preview = writable(null)
