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
