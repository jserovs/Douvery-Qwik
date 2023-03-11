import type { RequestHandler } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  cookie.delete(DATA_ACCESS_COOKIE_NAME, { path: '/' });
  throw redirect(302, '/');
};
