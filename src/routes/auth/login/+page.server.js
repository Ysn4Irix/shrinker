import { error, fail, redirect } from '@sveltejs/kit'
import { loginUserSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		try {
			const password = formData.password_login

			const user = await locals.pb.collection('users').authWithPassword(formData.email, password)

			if (!user.record.verified) {
				await locals.pb.collection('users').requestVerification(formData.email)
				locals.pb?.authStore?.clear()
				return {
					notVerified: true
				}
			}
		} catch (err) {
			const { response } = err
			throw error(
				err.status,
				response.message === 'Failed to authenticate.'
					? 'Invalid credentials, check your entries and try again.'
					: 'Something went wrong while processing your request.'
			)
		}
		throw redirect(303, '/')
	}
}
