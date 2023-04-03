import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './layout.css?inline';
import { DouveryServicesLogo } from '~/components/(byServices)/Address/components/DouveryAuthLogo/douvery-auth-logo';
import type { RequestHandler } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (!acccessToken) {
    throw redirect(302, '/a/login?rr=/by/segure/address/');
  }
};
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <header>
        <DouveryServicesLogo />
      </header>
      <main>
        <Slot />
      </main>
    </>
  );
});
