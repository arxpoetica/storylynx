const lists = { ordered: 'ol', unordered: 'ul' }

export const code_to_html = code => {

	let html = ''
	let par_group = false

	if (code.blocks && code.blocks.length) {
		for (let block of code.blocks) {
			const { type, data } = block

			// closing from prior run if prior run was paragraph
			if (type !== 'paragraph' && par_group) {
				html += '</div>'
				par_group = false
			}

			if (type === 'paragraph') {


				if (!par_group) {
					html += '<div class="paragraphs">'
					par_group = true
				}
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


				html += `<blockquote class="quote-${data.alignment}${data.caption ? ' has-caption' : ''}"><p>${data.text}</p>`
				if (data.caption) {
					html += `<footer>${data.caption}</footer>`
				}
				html += '</blockquote>'


			} else if (type === 'delimiter') {


				html += '<div class="delimiter"></div>'


			} else if (type === 'image') {


				if (data.valid === 'true') {
					const caption = data.caption = data.caption || ''
					const source = data.source = data.source || ''
					html += '<figure'
					let classes = [caption ? 'has-caption' : '', source ? 'has-source' : ''].join(' ')
					html += classes ? ` class="${classes}"` : ''
					html +=`><img src="${data.src}" `
					// FIXME: come up with a proper escaping function:
					// SEE: https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
					// OR: https://stackoverflow.com/questions/7753448/how-do-i-escape-quotes-in-html-attribute-values
					html += `alt="${(caption + ' ' + source).replace(/"/g, '&quot;')}"/>`
					if (caption || source) {
						html += '<figcaption>'
						html += caption ? `<span class="caption">${caption}</span>` : ''
						html += source ? `<span class="source">${source}</span>` : ''
						html += '</figcaption>'
					}
					html += '</figure>'
				}


			}
		}
	}

	return html
}
