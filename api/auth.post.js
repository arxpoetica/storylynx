import { getToken } from '../utils/auth-utils.js'
import { handleError } from '../utils/loaders.js'

export default segment => {

	return async function(req, res) {

		try {
			const token = getToken(req)
			if (token.unauthorized) { throw Error('Unauthorized') }

			const api_path = `${process.env.LYNX_API_PLUGIN}/api/${segment}`
			const { default: api } = await import(api_path)
			res.json(await api(req.body))

		} catch (error) {
			return handleError(error, res)
		}

	}

}
