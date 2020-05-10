export const format_url = asset => {
	const { url, width, height } = asset

	const url_interface = new URL(url)
	let path = url_interface.origin

	if (width || height) {
		path += '/resize='
		if (width && height) {
			path += `w:${width},h:${height},fit:crop`
		} else if (width) {
			path += `w:${width}`
		} else {
			path += `h:${height}`
		}
	}
	return path + url_interface.pathname
}
