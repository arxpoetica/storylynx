// TODO: throw this in an npm repository ???

// string
export const hyphenate = str => str.replace(/[^a-z0-9+]+/gi, ' ').trim().replace(/ /g, '-')

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
