import { writable } from 'svelte/store'
import { storable } from './special-store.js'

// === >>> General Helpers

export const target = writable()
export const fullwidth = writable(false)
export const saving = writable(false)
export const saveable = writable(false)
export const egg_preview = writable(null)

// === >>> Content List

export const content_vars = writable()

// === >>> Quick Arrange

export const assets = writable([])
export const current_group = writable(-1)
export const groups = writable([])

// ==================================== >>> Sequence Editor

export const seq = writable()
export const preview_clip = writable(null)
export const handlers = writable()
export const visible_bins = storable('story.visible-bins', {})
export const enums = writable({})

// === >>> Iframe Clip Preview

export const messenger = writable()

// === >>> Drag & Drop

export const drag_elem = writable()
export const swap_elem = writable()

// === >>> HandsonTable Table Editor

export const hot = writable(null)
export const hot_loaded = writable(null)
export const hot_changes = writable([])


// === >>> HTML EditorJS Editor

// ...to come...
