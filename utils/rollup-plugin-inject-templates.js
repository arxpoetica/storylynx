const path = require('path')
const { red } = require('ansi-colors')

module.exports = function overrides({ template, domain }) {
	return {
		name: 'inject-templates',
		async transform(code, id) {
			try {
				if (/\/storylynx\/svelte\/stories\/Clip\.svelte$/.test(id)) {
					const filepath = path.join(process.cwd(), `/src/node_modules/@themes/${template}/templates`)
					code = code.replace('{% INSERT ROLLUP CODE HERE %}', filepath)
					return { code, map: null }
				}
			} catch (error) {
				console.log('\n~>', red('Something is wrong with the templates wrapper setup.'))
				console.log('\n~>', `Are you missing an @themes/${template}/template/_TemplateWrapper.svelte file?.\n`)
			}
			return null
		},
	}
}
