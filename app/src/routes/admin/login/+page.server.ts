import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL, PUBLIC_AUTH_TOKEN_COOKIE_KEY } from '$env/static/public';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const password = data.get('password');

		const response = await event.fetch(`${PUBLIC_API_URL}/admin/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		});

		const { error, token } = await response.json();

		if (!response.ok) {
			return fail(response.status, { error });
		}

		event.cookies.set(PUBLIC_AUTH_TOKEN_COOKIE_KEY, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24
		});

		throw redirect(303, '/admin');
	}
};
