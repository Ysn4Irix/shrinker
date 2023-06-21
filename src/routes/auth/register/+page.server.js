import { error, fail } from '@sveltejs/kit'
import { validateData } from '$lib/utils'
import { registerUserSchema } from '$lib/schemas'
import { nanoid } from 'nanoid'

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		let username =
			(formData.name.includes(' ')
				? formData.name.split(' ').join('')
				: formData.name
			).toLowerCase() + nanoid(5)

		try {
			await locals.pb.collection('users').create({
				username,
				password: formData.password_register,
				passwordConfirm: formData.password_register_confirm,
				...formData
			})
			await locals.pb.collection('users').requestVerification(formData.email)
		} catch (err) {
			const { response } = err
			console.log('🚀 ~ file: +page.server.js:27 ~ register: ~ err:', err)
			throw error(
				err.status,
				response.data.email
					? 'The email is invalid or already in use.'
					: 'Something went wrong. while processing your request.'
			)
		}

		return {
			success: true
		}
	}
}
