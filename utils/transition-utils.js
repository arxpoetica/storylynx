export const animate_clip = (clip, transition, intersecting, scroll/* , order */) => {
	// if (intersecting && transition && clip && order === '1980-0020') {
	if (intersecting && transition && clip) {
		const { top, height } = clip.getBoundingClientRect()
		const threshold = 1 - Math.min(Math.max((top + height) / (height * 2), 0), 1)
		// console.log(top, threshold, scroll)

		if (transition === 'ZoomIn') {
			return `transform:scale(${1 + (threshold * 0.25)});`
		} else if (transition === 'ZoomOut') {
			return `transform:scale(${1.25 - (threshold * 0.25)});`
		} else if (transition === 'FixedFade' && top < 1) {
			return `opacity:1;`
		}
		return ''
	}
	return ''
}

export const animate_asset = (asset, transition, intersecting, scroll) => {
	if (intersecting && transition && asset) {

		const { top, height } = asset.getBoundingClientRect()
		const threshold = 1 - Math.min(Math.max((top + height) / (height * 2), 0), 1)

		if (transition === 'ZoomIn') {
			return `transform:scale(${1 + (threshold * 0.25)});`
		} else if (transition === 'ZoomOut') {
			return `transform:scale(${1.25 - (threshold * 0.25)});`
		}

		return ''
	}
	return ''
}
