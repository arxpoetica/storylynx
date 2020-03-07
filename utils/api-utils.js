export const query_string_to_json = query_string => {
	const pairs = query_string.split('&')
	var result = {}
	pairs.forEach(function(pair) {
		pair = pair.split('=')
		result[pair[0]] = decodeURIComponent(pair[1] || '')
	})
	return JSON.parse(JSON.stringify(result))
}
