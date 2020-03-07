import { getToken } from '../../../utils/auth-utils.js'
import { handleError } from '../../../utils/loaders.js'

export default async function(req, res) {
	try {
		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { changes } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/admin/assets/create.post.js`
		const { default: api } = await import(path)
		const { answer } = await api({ changes })

		return res.json(answer.error ? answer : answer.createResource)
	} catch (error) {
		return handleError(error, res)
	}

}
