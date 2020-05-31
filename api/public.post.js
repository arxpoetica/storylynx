import { handleError } from '../utils/loaders.js'

export default async(req, res) => {

	try {
		const { model, type } = req.params
		const api_path = `${process.env.LYNX_API_PLUGIN}/api/public/${model}/${type}.post.js`
		const { default: api } = await import(api_path)
		const result = await api(req.body)
		return result
	} catch (error) {
		return handleError(error, res)
	}

}
