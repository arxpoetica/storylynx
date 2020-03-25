export const format_url = (original_url, options) => {
	const url = new URL(original_url)
	let path = url.origin
	if (options.width || options.height) {
		path += '/resize='
		if (options.width && options.height) {
			path += `w:${options.width},h:${options.height}`
		} else if (options.width) {
			path += `w:${options.width}`
		} else {
			path += `h:${options.height}`
		}
		path += options.crop ? ',fit:crop' : ''
	} else if (options.crop) {
		// just a default size if crop only
		path += '/resize=w:600,h:600,fit:crop'
	}
	return path + url.pathname
}
