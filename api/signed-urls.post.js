import { getToken } from '../utils/auth-utils.js'
import { handleError } from '../utils/loaders.js'
import { Storage } from '@google-cloud/storage'
const storage = new Storage()

export default async(req, res) => {

	try {

		const token = getToken(req)
		if (token.unauthorized) { throw Error('Unauthorized') }

		const { filenames } = req.body
		const options = {
			version: 'v4',
			action: 'write',
			expires: Date.now() + 30 * 60 * 1000, // 30 minutes
			contentType: 'application/octet-stream',
		}

		const urls = []
		for (const filename of filenames) {
			console.log(`filename: ${filename}`)
			const [url] = await storage.bucket(process.env.LYNX_STORAGE_BUCKET).file(filename).getSignedUrl(options)
			urls.push(url)
		}

		return res.json({ urls })

	} catch (error) {
		return handleError(error, res)
	}

}
