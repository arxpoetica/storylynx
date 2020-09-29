import { hyphenate } from './basic-utils.js'

export const url_hash = ({ id, slug }) => slug ? `nav-${hyphenate(slug.toLowerCase())}` : `nav-${id}`

// FIXME: for some reason this is getting called twice on initial call...
export const prep_clip_for_preview = (edited_clip, original_clip) => {
	const edited_clip_copy = edited_clip ? JSON.parse(JSON.stringify(edited_clip)) : edited_clip = {}
	const original_clip_copy = original_clip ? JSON.parse(JSON.stringify(original_clip)) : {}
	edited_clip_copy.audio_clips = edited_clip_copy.audio_clips || original_clip_copy.audio_clips || []
	return edited_clip_copy
}


import { get } from 'svelte/store'
import { drag_elem, swap_elem } from '../stores/admin-store.js'

export const dragstart = (event, elem, not_draggable) => {
	if (not_draggable) { return }
	drag_elem.set(elem)
	event.dataTransfer.effectAllowed = 'move'
	event.dataTransfer.setData('text/html', elem.outerHTML)
	return true
}

export const dragover = (event, elem, not_draggable) => {
	if (not_draggable) { return }
	event.preventDefault()
	event.dataTransfer.dropEffect = 'move'

	const $drag_elem = get(drag_elem)
	if (elem !== $drag_elem) {
		const { top, bottom } = elem.getBoundingClientRect()
		if ((event.clientY - top) / (bottom - top) < 0.5) {
			elem.parentNode.insertBefore($drag_elem, elem)
		} else {
			elem.parentNode.insertBefore(elem, $drag_elem)
		}
		swap_elem.set(elem)
	}
}

export const new_order = (prev, next) => {
	const order = Math.floor((prev - next) / 2)
	if (order < 1) {
		// guard; need to reorder all the items
	}
	return order
}

