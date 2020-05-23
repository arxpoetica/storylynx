const lists = { ordered: 'ol', unordered: 'ul' }

export const code_to_html = code => {

	let html = ''

	if (code.blocks && code.blocks.length) {
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
			} else if (type === 'quote') {
				html += `<blockquote class="quote-${data.alignment}"><p>${data.text}`
				if (data.caption) {
					html += `<footer>${data.caption}</footer>`
				}
				html += '</p></blockquote>'
			} else if (type === 'image') {
				if (data.valid === 'true') {
					data.caption = data.caption || ''
					data.source = data.source || ''
					html += `<figure><img src="${data.src}" `
					// FIXME: come up with a proper escaping function:
					// SEE: https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
					// OR: https://stackoverflow.com/questions/7753448/how-do-i-escape-quotes-in-html-attribute-values
					html += `alt="${(data.caption + ' ' + data.source).replace(/"/g, '&quot;')}"/>`
					if (data.caption || data.source) {
						html += '<figcaption>'
						html += data.caption ? `<span class="caption">${data.caption}</span>` : ''
						html += data.source ? `<span class="source">${data.source}</span>` : ''
						html += '</figcaption>'
					}
					html += '</figure>'
				}
			}
		}
	}

	return html
}
