import pb from '$lib/pocketbase'
import { serializeNonPOJOs } from '$lib/utils'
import { COOKIE_NAME } from '$lib/constants'
import { dev } from '$app/environment'

export const handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '', COOKIE_NAME)

	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh()
		}
	} catch (_) {
		pb.authStore.clear()
		event.locals.user = undefined
	}

	event.locals.pb = pb
	event.locals.user = serializeNonPOJOs(pb.authStore.model)

	const response = await resolve(event)
	response.headers.append(
		'set-cookie',
		pb.authStore.exportToCookie({ secure: !dev, sameSite: 'lax' }, COOKIE_NAME)
	)

	return response
}
