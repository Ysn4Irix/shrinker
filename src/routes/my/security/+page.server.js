import { error, fail, redirect } from '@sveltejs/kit'
import { updatePasswordSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'

/** @type {import('./$types').Actions} */
export const actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema)

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors
			})
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData)
			locals.pb.authStore.clear()
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:20 ~ updatePassword: ~ err:', err)
			throw error(
				err.status,
				'Something went wrong while updating your password, check your entries'
			)
		}
		return {
			success: true
		}
	},
	deleteAccount: async ({ locals }) => {
		try {
			await locals.pb.collection('users').delete(locals.user.id)
			locals.pb.authStore.clear()
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:20 ~ updatePassword: ~ err:', err)
			throw error(err.status, 'Something went wrong while deleting your account')
		}
		return {
			success: true
		}
	}
}
