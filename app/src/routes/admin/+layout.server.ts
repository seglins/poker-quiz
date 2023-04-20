import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL, PUBLIC_AUTH_TOKEN_COOKIE_KEY } from '$env/static/public';

export async function load({ url, cookies, fetch }) {
	const token = cookies.get(PUBLIC_AUTH_TOKEN_COOKIE_KEY);
	const isLoginPage = url.pathname === '/admin/login';

	const response = await fetch(`${PUBLIC_API_URL}/admin/auth`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		cookies.delete(PUBLIC_AUTH_TOKEN_COOKIE_KEY);
	}

	if (!isLoginPage && !response.ok) {
		throw redirect(303, '/admin/login');
	}

	if (isLoginPage && response.ok) {
		throw redirect(303, '/admin');
	}
}
