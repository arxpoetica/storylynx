const path = require('path')
const { EOL } = require('os')
const { yellow, red } = require('ansi-colors')
const { exists, readFile, writeFile } = require('fs-extra')
const totalist = require('totalist')
const CheapWatch = require('cheap-watch')

let templates_path
const script = process.env.npm_lifecycle_event
const ext_regex = /\.(html|svelte)$/
const files = {}
let init = false

module.exports = function overrides({ template, domain }) {
	return {
		name: 'inject-templates',
		async buildStart() {
			if (!init) {

				templates_path = path.join(process.cwd(), `/src/node_modules/@themes/${template}/templates`)

				if (await exists(templates_path)) {

					await totalist(templates_path, async(name, abs) => {
						if (ext_regex.test(abs)) {
							const filename = name.replace(ext_regex, '')
							files[filename] = filename
						}
					})

					if (script !== 'build' && script !== 'export') {
						const watch = new CheapWatch({
							dir: templates_path,
							filter: ({ path, stats }) => ext_regex.test(path),
							debounce: 100,
						})
						await watch.init()
						watch.on('+', async({ path: filepath, stats, isNew }) => {
							if (stats.isFile()) {
								if (domain === 'client') {
									console.log('\n~>', yellow(isNew ? 'Adding' : 'Changing'), './' + filepath, '\n')
								}
								if (isNew) {
									const filename = filepath.replace(ext_regex, '')
									files[filename] = filename
								}
								await mutate_and_bump_clip_file()
							}
						})
						watch.on('-', async({ path: filepath, stats }) => {
							if (stats.isFile()) {
								if (domain === 'client') {
									console.log('\n~>', red('Deleting'), './' + filepath, '\n')
								}
								const filename = filepath.replace(ext_regex, '')
								delete files[filename]
								await mutate_and_bump_clip_file()
							}
						})
					}

				}
			}
		},
		async transform(code, id) {
			if (/\/storylynx\/svelte\/modals\/Clip\.svelte$/.test(id)) {
				let importers = ''
				for (const file in files) {
					const filepath = path.join(process.cwd(), `/src/node_modules/@themes/${template}/templates/${file}.svelte`)
					importers += `import ${file} from '${filepath}'${EOL}`
				}
				importers += `component = { ${Object.keys(files).join(', ')} }${EOL}`

				code = code.replace('// INSERT ROLLUP CODE HERE', importers)

				return { code, map: null }
			}
			return null
		},
		buildEnd() {
			if (!init) {
				init = true
			}
		},
	}
}

// ...yes, we're mutating the file, but in a premeditated, controlled fashion...
const filepath = path.join(process.cwd(), '/node_modules/storylynx/svelte/modals/Clip.svelte')
async function mutate_and_bump_clip_file() {
	const contents = await readFile(filepath, 'utf8')
	if (contents.endsWith(' ')) {
		await writeFile(filepath, contents.trim() + EOL, 'utf8')
	} else {
		await writeFile(filepath, contents + EOL + ' ', 'utf8')
	}
}

