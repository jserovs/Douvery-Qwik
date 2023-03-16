import type { RequestHandler } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';

export const onGet: RequestHandler = async ({ cookie, redirect, url }) => {
  cookie.delete(DATA_ACCESS_COOKIE_NAME, { path: '/' });
  const query = url.searchParams.get('rr') || '';

  throw redirect(302, query);
};
