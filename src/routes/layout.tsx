import { component$, Slot, useStore, useVisibleTask$ } from '@builder.io/qwik';
import Header from '../components/navBar/navBar';
import Nav from '../components/nav/nav';
import { Footer } from '~/components/footer/footer';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import platform from 'platform';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import type { UserACC, ZipCode } from '~/utils/types';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  DATA_COUNTRY_COOKIE_NAME,
  DATA_ZIPCODE_COOKIE_NAME,
} from '~/services/auth/code/zipCode';
import { CART_QUANTITY_ACCESS_COOKIE_NAME } from '~/services/cart/cart';

export const useGetCurrentUser = routeLoader$<UserACC | null>(
  async ({ cookie }) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;

    if (accessCookie) {
      const data = decodeToken(accessCookie, passwordKEY, serverKey);

      return data;
    }
    return null;
  }
);
export const useGetCurrentZipCode = routeLoader$<ZipCode | null>(
  async ({ cookie }: any) => {
    const accessCookie = cookie.get(DATA_ZIPCODE_COOKIE_NAME)?.value;

    if (accessCookie) {
      return decodeToken(accessCookie, passwordKEY, serverKey);
    }
    return null;
  }
);
export const useGetCurrentCountry = routeLoader$<ZipCode | null>(
  async ({ cookie }: any) => {
    const accessCookie = cookie.get(DATA_COUNTRY_COOKIE_NAME)?.value;

    if (accessCookie) {
      return decodeToken(accessCookie, passwordKEY, serverKey);
    }
    return null;
  }
);

export const useGetCurrentCartQuatity = routeLoader$<string | null>(
  async ({ cookie }: any) => {
    const accessCookie = cookie.get(CART_QUANTITY_ACCESS_COOKIE_NAME)?.value;

    if (accessCookie) {
      return accessCookie;
    }
    return null;
  }
);

export default component$(() => {
  const isOpen = useStore({ setIsOpen: false });
  const userACC = useGetCurrentUser().value;
  const getZipCode = useGetCurrentZipCode().value;
  const getCountryUser = useGetCurrentCountry().value;
  const loc = useLocation();
  const segureUrl = loc.url.href.match('/segure/') ? false : true;
  useVisibleTask$(() => {
    const info = platform.parse(window.navigator.userAgent);
    info;
  });

  return (
    <>
      <main>
        {loc.url.pathname !== '/a/login/' &&
        loc.url.pathname !== '/a/register/' &&
        loc.url.pathname !== '/a/register/verified/' &&
        loc.url.pathname !== '/a/recover-account/' &&
        segureUrl ? (
          <>
            <Header
              is={isOpen}
              user={userACC}
              zipCode={getZipCode}
              userCoun={getCountryUser}
            />
            <Nav />
          </>
        ) : (
          <></>
        )}
        <section>
          {isOpen.setIsOpen && (
            <>
              {' '}
              <div
                class="shr-srhd"
                onClick$={() => (isOpen.setIsOpen = false)}
              ></div>
            </>
          )}

          <Slot />
        </section>
      </main>
      {loc.url.pathname !== '/a/login/' &&
      loc.url.pathname !== '/a/register/' &&
      loc.url.pathname !== '/a/recover-account/' ? (
        <>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </>
  );
});
