import { error, fail } from '@sveltejs/kit'
import { resetPasswordSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'

/** @type {import('./$types').Actions} */
export const actions = {
	resetPassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), resetPasswordSchema)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(formData.email)
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:23 ~ resetPassword: ~ err:', err)
			throw error(err.status, err.message)
		}
		return {
			success: true
		}
	}
}
