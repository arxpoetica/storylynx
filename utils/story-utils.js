import { hyphenate } from './basic-utils.js'

export const url_hash = ({ id, slug }) => slug ? `nav-${hyphenate(slug.toLowerCase())}` : `nav-${id}`

// FIXME: for some reason this is getting called twice on initial call...
export const prep_clip_for_preview = (edited_clip, original_clip) => {
	const edited_clip_copy = edited_clip ? JSON.parse(JSON.stringify(edited_clip)) : edited_clip = {}
	const original_clip_copy = original_clip ? JSON.parse(JSON.stringify(original_clip)) : {}

	edited_clip_copy.asset_bins = edited_clip_copy.asset_bins.map(bin => {
		for (let block of bin.html_blocks) {
			block.mime_type = 'text/html'
			delete block.code
			bin.assets.push(block)
		}
		delete bin.html_blocks
		return bin
	})
	edited_clip_copy.audio_clips = edited_clip_copy.audio_clips || original_clip_copy.audio_clips || []
	return edited_clip_copy
}
