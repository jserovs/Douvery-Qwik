import type { Cookie } from '@builder.io/qwik-city';
import Cookies from 'universal-cookie';

export const DATA_ACCESS_COOKIE_NAME = 'SESSION_D';
export const DATA_ACCESS_COOKIE_NAME_US = 'SESSION_US';

export const setsCookiesData = (name: string, dataAccessCookies: string) => {
  const cookies = new Cookies();
  cookies.set(name, dataAccessCookies, {
    path: '/',
  });
};

export const setCookiesData = (dataAccess: string, cookie: Cookie) => {
  cookie.set(DATA_ACCESS_COOKIE_NAME, dataAccess, {
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    expires: new Date(new Date().getTime() + DATA_ACCESS_COOKIE_NAME),
  });
};

export const getCookieData = (name: string) => {
  const cookies = new Cookies();
  return cookies.get(name);
};

export const accessTokenValidate = async (
  token: string | undefined
): Promise<boolean> => {
  if (!token) {
    return false;
  }

  const res = await authorizedFetch(
    `http://localhost:7629/api/a/tokenIsValid`,
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    }
  );

  return res.ok;
};

export const authorizedFetch = async (url: string, options = {}) => {
  const response = await fetch(url, { credentials: 'include', ...options });

  if (response.status === 401) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      // Handle error refreshing access token
      console.error('Failed to refresh access token', error);
      throw new Error('Failed to refresh access token');
    }
  }

  return response;
};
