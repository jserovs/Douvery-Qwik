import type { Cookie } from '@builder.io/qwik-city';

export const DATA_ZIPCODE_COOKIE_NAME = 'SESSION_ZIPCODE';

export const setCookiesDataZIPCODE = (dataAccess: string, cookie: Cookie) => {
  cookie.set(DATA_ZIPCODE_COOKIE_NAME, dataAccess, {
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    expires: new Date(new Date().getTime() + DATA_ZIPCODE_COOKIE_NAME),
  });
};
