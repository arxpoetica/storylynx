// import bcrypt from 'bcryptjs'
import { handleError } from '../../utils/loaders.js'
import { getToken, setToken } from '../../utils/auth-utils.js'

export default async function(req, res) {

	try {
		const token = getToken(req)
		if (!token.unauthorized) { throw Error('Unauthorized') }

		const {
			username,
			password,
			role = 'user', // user, editor, admin ???
			// first,
			// last,
			// avatar,
		} = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/auth/signup.post.js`
		const { default: api } = await import(path)
		const { error, first, last, avatar } = await api({ username, password, role })

		if (error) { throw Error(error) }

		const payload = { username, role, first, last, avatar }
		setToken(payload, res)
		return res.json(payload)

	} catch (error) {
		return handleError(error, res)
	}

}
