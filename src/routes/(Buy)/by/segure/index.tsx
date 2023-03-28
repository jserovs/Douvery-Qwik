import { component$ } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
export const onGet: RequestHandler = async ({ cookie, redirect,url }) => {
    const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    if (!acccessToken) {
      throw redirect(302, '/a/login?rr=' + url.pathname + url.search);
    }
  };
export default  component$(() => {
  return <div>Hello Qwik!</div>
});