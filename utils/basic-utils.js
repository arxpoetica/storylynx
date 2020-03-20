// TODO: throw this in an npm repository ???

// string
export const hyphenate = str => str.replace(/[^a-z0-9+]+/gi, ' ').trim().replace(/ /g, '-')
export const camel_to_hyphen = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// date/time
import dayjs from 'dayjs'
export const datestamp = datetime => dayjs(datetime).format('MMMM DD, YYYY')
export const timestamp = datetime => dayjs(datetime).format('h:mma')
export const formattedstamp = datetime => dayjs(datetime).format('M.D.YYYY')

// measurements
export const bytesFormat = bytes => {
	var thresh = 1000
	if (Math.abs(bytes) < thresh) {
		return bytes + ' B'
	}
	var units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	var unit = -1
	do {
		bytes /= thresh
		++unit
	} while (Math.abs(bytes) >= thresh && unit < units.length - 1)
	return Math.round(bytes) + ' ' + units[unit]
}

// links / urls
export const get_src = (clip, opts = {}) => {
	opts.index = typeof opts.index === 'number' ? opts.index : 0
	const asset = clip.assets[opts.index]
	if (!asset && !asset.mime_type.includes('image')) {
		return undefined
	}

	let src = asset.url.split(asset.handle)[0]
	if (opts.width || opts.height) {
		src += 'resize='
		if (opts.width && opts.height) {
			src += `w:${opts.width},h:${opts.height}`
		} else if (opts.width) {
			src += `w:${opts.width}`
		} else {
			src += `h:${opts.height}`
		}
		src += opts.crop ? ',fit:crop/' : '/'
	} else if (opts.crop) {
		// just a default size if crop only
		src += 'resize=w:600,h:600,fit:crop/'
	}
	return src + asset.handle
}
// TODO: deprecated, remove and replace w/ `get_src` (DO NO RENAME IT TO `src` because that causes native name conflicts...)
// TODO: deprecated, remove and replace w/ `get_src` (DO NO RENAME IT TO `src` because that causes native name conflicts...)
// TODO: deprecated, remove and replace w/ `get_src` (DO NO RENAME IT TO `src` because that causes native name conflicts...)
export const src = (asset, options = {}) => {
	if (asset) {
		let src = asset.url.split(asset.handle)[0]
		src += `resize=w:${options.width || '600'},h:${options.height || '600'}`
		src += options.crop ? ',fit:crop' : ''
		src += `/${asset.handle}`
		return src
	} else {
		return '/img/blank.jpg'
	}
}
export const alt = asset => asset.summary ? asset.summary : 'No description for this resource.'
