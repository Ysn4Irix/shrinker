import { customAlphabet } from 'nanoid'
import { PUBLIC_POCKETBASE_URL } from '$env/static/public'

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj)
}

/**
 *
 * @param {string} fullname
 * @return {string} Generated Username
 */
export const generateUsername = (fullname) => {
	const id = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 4)
	return `${fullname.slice(0, 4)}${id}`
}

/**
 *
 * @param {number} collectionId
 * @param {number} recordId
 * @param {string} fileName
 * @param {string} size
 * @return {string} full avatar url
 */
export const getImageUrl = (collectionId, recordId, fileName, size = '0x0') => {
	return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}

/**
 *
 * @param {FormData} formData
 * @param {import('zod').ZodSchema} schema
 */
export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData)

	try {
		const data = schema.parse(body)
		return {
			formData: data,
			errors: null
		}
	} catch (err) {
		console.log('🚀 ~ file: utils.js:44 ~ validateData ~ err:', err)
		const errors = err.flatten()
		return {
			formData: body,
			errors
		}
	}
}

/**
 *
 * @param {string} shortLink
 * @param {string} origin
 * @return {string} full short link
 */
export const getShortLink = (shortLink, origin) => {
	return `${
		process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : origin
	}/$/${shortLink}`
}
