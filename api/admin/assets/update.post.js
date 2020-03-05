import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../utils/loaders.js'

export async function post(req, res) {

	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { id, changes } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/assets/single.post.js`
		const { default: api } = await import(path)
		const { answer } = await api({ id, changes })

		return res.json(answer.error ? answer : answer.updateResource)
	} catch (error) {
		return handleError(error, res)
	}

}
