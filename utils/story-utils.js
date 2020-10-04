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
import { drag_elem } from '../stores/admin-store.js'

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
	}
}

export const get_unknown_order = prev_order => (Math.ceil((prev_order + 0.5) / 10000) * 10000) + 10000
export const get_order_mid_distance = (prev_order, next_order) => Math.floor((next_order - prev_order) / 2)

export const get_changes = elem => {
	let changes = []

	const curr_index = parseInt(elem.id.split('_')[1])

	const prev_parts = (elem.previousElementSibling || { id: '_-1_0' }).id.split('_')
	const prev_index = parseInt(prev_parts[1])
	const prev_order = parseInt(prev_parts[2])

	const next_order = elem.nextElementSibling
		? parseInt(elem.nextElementSibling.id.split('_')[2])
		: get_unknown_order(prev_order)

	// only need to check against one of the siblings, so checking against previous index
	if (prev_index !== curr_index - 1) {
		const order_mid_distance = get_order_mid_distance(prev_order, next_order)
		if (order_mid_distance < 1) {
			// need to reorder all the items
			changes = [...elem.parentNode.children].map((child, child_index) => {
				return { id: child.id.split('_')[0], order: (child_index + 1) * 10000 }
			})
		} else {
			// just reorder the one
			changes = [{ id: elem.id.split('_')[0], order: prev_order + order_mid_distance }]
		}
	}

	return changes
}
