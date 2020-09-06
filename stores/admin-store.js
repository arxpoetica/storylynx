import { writable } from 'svelte/store'
import { storable } from './special-store.js'

// === >>> General Helpers

export const fullwidth = writable(false)
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

// === >>> Sequence Editor

export const visible_bins = storable('story.visible-bins', {})

// === >>> HTML EditorJS Editor

export const preview_clip = writable(null)
export const html_templates = writable([])
export const html_colors = writable([])

// === >>> Iframe Clip Preview

export const i_sequence = writable(false)
export const i_clip_id = writable(false)








// === >>> DEPRECATED / NEVER USED

// export const FileStackLoaded = writable(false)
