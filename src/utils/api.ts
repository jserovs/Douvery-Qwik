

import { isBrowser } from '@builder.io/qwik/build';

import { getCookie, setCookie } from './cookie';
import { AUTH_TOKEN, DOUVERY_PUBLIC_URL } from '~/constants/constants';

export const execute = async <T>(body: {
	query: string;
	variables: Record<string, any>;
}): Promise<T> => {
	let headers: Record<string, string> = { 'Content-Type': 'application/json' };
	if (isBrowser) {
		const token = getCookie(AUTH_TOKEN);
		headers = { ...headers, Authorization: `Bearer ${token}` };
	}
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
	};

	const response = await fetch(DOUVERY_PUBLIC_URL, options);
	if (isBrowser) {
		const responsetoken = response.headers.get('vendure-auth-token');
		if (responsetoken) {
			setCookie(AUTH_TOKEN, responsetoken, 365);
		}
	}
	const json: any = await response.json();
	return json.data;
};