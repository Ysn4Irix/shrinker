import { fail, error } from '@sveltejs/kit'
import { updateProfileSchema } from '$lib/schemas'
import { serialize } from 'object-to-formdata'
import { validateData } from '$lib/utils'

/** @type {import('./$types').Actions} */
export const actions = {
	updateProfile: async ({ locals, request }) => {
		const body = await request.formData()
		const userAvatar = body.get('avatar')

		if (userAvatar.size === 0) {
			body.delete('avatar')
		}

		const { formData, errors } = await validateData(body, updateProfileSchema)
		const { avatar, ...rest } = formData

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			})
		}

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update(locals.user.id, serialize(formData))
			locals.user.name = name
			locals.user.avatar = avatar
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:33 ~ updateProfile: ~ err:', err)
			throw error(400, 'Something went wrong while updating your profile, check your entries')
		}

		return {
			success: true
		}
	}
}
