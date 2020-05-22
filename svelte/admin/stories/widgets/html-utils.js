const lists = { ordered: 'ol', unordered: 'ul' }

export const code_to_html = code => {

	let html = ''

	for (let block of code.blocks) {
		const { type, data } = block

		if (type === 'paragraph') {
			html += `<p>${data.text}</p>`
		} else if (type === 'header') {
			html += `<h${data.level}>${data.text}</h${data.level}>`
		} else if (type === 'list') {
			html += `<${lists[data.style]}>`
			for (let item of data.items) {
				html += `<li>${item}</li>`
			}
			html += `</${lists[data.style]}>`
		} else if (type === 'image') {
			// FIXME: figure out the alt and caption stuff...
			html += `<figure><img src="${data.url}" alt="No alt yet..."/>`
			// html += `<figcaption>...to come...</figcaption>`
			html += '</figure>'
		}
	}

	return html
}
