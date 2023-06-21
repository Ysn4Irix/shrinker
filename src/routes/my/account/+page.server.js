import { error, fail } from '@sveltejs/kit'
import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas'
import { validateData } from '$lib/utils'

/** @type {import('./$types').Actions} */
export const actions = {
	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email)
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:20 ~ updateEmail: ~ err:', err)
			throw error(err.status, 'Something went wrong while updating your email, check your entries')
		}

		return {
			success: true
		}
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${formData.username}"`)
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:41 ~ updateUsername: ~ err:', err)
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: formData.username })
					locals.user.username = username
				} catch (err) {
					console.log('🚀 ~ file: +page.server.js:52 ~ updateUsername: ~ err:', err)
					throw error(
						err.status,
						'Something went wrong while updating your username, check your entries'
					)
				}
				return {
					success: true
				}
			}
			throw error(err.status, 'Username already exists')
		}
	}
}
