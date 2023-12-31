import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

import { VerticalTabs } from '~/components/(Account)/VerticalTabs/vertical-tabs';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
export const onGet: RequestHandler = async ({ cookie, redirect, url }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (!acccessToken) {
    throw redirect(302, '/a/login?rr=' + url.pathname);
  }
};
export default component$(() => {
  useStylesScoped$(`
   div {
    min-height: 100rem ;
   background-color: var(--color-background-white);
     }
   
  `);
  return (
    <div>
      <VerticalTabs>
        <Slot />
      </VerticalTabs>
    </div>
  );
});
