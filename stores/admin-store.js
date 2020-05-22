import { writable } from 'svelte/store'

// === >>> General Helpers

export const saving = writable(false)
export const saveable = writable(false)
export const egg_preview = writable(null)

// === >>> Content List

export const content_vars = writable()

// === >>> HandsonTable Table Editor

export const hot = writable(null)
export const hot_loaded = writable(null)
export const hot_changes = writable([])

// === >>> Quick Arrange

export const assets = writable([])
export const current_group = writable(-1)
export const groups = writable([])

// === >>> HTML EditorJS Editor

export const preview_clip = writable(null)









// === >>> DEPRECATED / NEVER USED

// export const FileStackLoaded = writable(false)
