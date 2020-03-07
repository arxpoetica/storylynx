import { handleError } from '../../utils/loaders.js'
import { setToken } from '../../utils/auth-utils.js'
import { src } from '../../utils/basic-utils.js'

export default async function(req, res) {

	try {

		const { username, password } = req.body

		const path = `${process.env.LYNX_API_PLUGIN}/api/auth/login.post.js`
		const { default: api } = await import(path)
		let { error, role, first, last, avatar } = await api({ username, password })

		if (error) { throw Error(error) }

		avatar = src(avatar, { crop: true })
		const payload = { username, role, first, last, avatar }
		setToken(payload, res)
		return res.json(payload)

	} catch (error) {
		return handleError(error, res)
	}

}
