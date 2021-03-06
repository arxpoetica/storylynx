export const ConstructSimpleImage = (SimpleImageComponent, components) => {
	return class SimpleImage {
		static get toolbox() {
			return {
				title: 'Image',
				icon: `
					<svg
						width="17"
						height="15"
						viewBox="0 0 336 276"
						xmlns="http://www.w3.org/2000/svg">
							<path d="
								M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34
								34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56
								30-81-67-66 39v23c0 19 15 34 34 34h178c17 0
								31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0
								44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35
								0 79 0z"/>
					</svg>
				`,
			}
		}

		constructor({ data }) {
			this.data = data
		}

		render() {
			const wrapper = document.createElement('div')

			this.component = new SimpleImageComponent({
				target: wrapper,
				props: {
					loaded: this.data && this.data.valid === 'true',
					src: this.data && this.data.src ? this.data.src : '',
					caption: this.data && this.data.caption ? this.data.caption : '',
					source: this.data && this.data.source ? this.data.source : '',
				},
			})
			components.push(this.component)

			return wrapper
		}

		save(block_content) {
			return {
				valid: block_content.querySelector('input.valid').value,
				src: block_content.querySelector('input.src').value,
				caption: block_content.querySelector('input.caption').value,
				source: block_content.querySelector('input.source').value,
			}
		}

		// destroy() {
		// 	console.log(this.component)
		// 	// window.temp_comp = this.component
		// }
	}
}
