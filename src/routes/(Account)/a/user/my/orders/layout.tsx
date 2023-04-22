import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { VerticalTabsOrders } from '~/components/(Account)/Orders/components/VerticalTabs/vertical-tabs-orders';
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
    <div class="container-all">
      {' '}
      <VerticalTabsOrders>
        <Slot />
      </VerticalTabsOrders>
    </div>
  );
});
