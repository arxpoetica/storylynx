import { getToken } from '../utils/auth-utils.js'
import { handleError } from '../utils/loaders.js'

export default async(req, res) => {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { model, type } = req.params
		const api_path = `${process.env.LYNX_API_PLUGIN}/api/admin/${model}/${type}.post.js`
		const { default: api } = await import(api_path)
		return await api(req.body)
	} catch (error) {
		return handleError(error, res)
	}

}
