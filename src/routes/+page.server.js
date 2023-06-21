import { error, fail, redirect } from '@sveltejs/kit'
import { nanoid } from 'nanoid/async'
import { getShortLink, serializeNonPOJOs, validateData } from '$lib/utils'
import { linkSchema } from '$lib/schemas'

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth/login')
	}

	try {
		const links = await locals.pb.collection('links').getFullList({
			sort: '-views',
			filter: `createdBy="${locals.user?.id}"`,
			expand: ''
		})

		return {
			links: serializeNonPOJOs(links)
		}
	} catch (err) {
		console.log('🚀 ~ file: +page.server.js:18 ~ load ~ err:', err)
		throw error(500, 'Something went wrong while fetching your links. Please try again later.')
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	createShortLink: async ({ request, locals, url: Url }) => {
		const { formData, errors } = await validateData(await request.formData(), linkSchema)

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		const { url, expiredIn, expiration } = formData
		const shortSlug = await nanoid(9)

		try {
			let expirationTime = 0

			if (expiredIn) {
				if (expiration !== 'Infinity')
					expirationTime = Date.now() + parseInt(expiration) * 60 * 1000

				await locals.pb.collection('links').create({
					url,
					shortSlug,
					createdBy: locals.user?.id,
					expiration: expirationTime.toString()
				})
			} else {
				await locals.pb.collection('links').create({
					url,
					shortSlug,
					createdBy: locals.user?.id,
					expiration: 'Infinity'
				})
			}
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:42 ~ createShortLink: ~ err:', err)
			throw error(
				500,
				'Something went wrong while creating your short link. Please try again later.'
			)
		}

		return {
			success: true,
			shortLink: getShortLink(shortSlug, Url.origin),
			url
		}
	},
	deleteShortLink: async ({ request, locals }) => {
		const formData = await request.formData()

		try {
			await locals.pb.collection('links').delete(formData.get('shortLinkId'))
		} catch (err) {
			console.log('🚀 ~ file: +page.server.js:67 ~ deleteShortLink: ~ err:', err)
			throw error(500, 'Something went wrong while deleting your link. Please try again later.')
		}

		return {
			success: true
		}
	}
}
