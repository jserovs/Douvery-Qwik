import { component$, Slot, useStore } from '@builder.io/qwik';
import Header from '../components/header/header';
import Nav from '../components/nav/nav';
import { Footer } from '~/components/footer/footer';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';

import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import type { UserACC, ZipCode } from '~/utils/types';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/auth-login';
import { DATA_ZIPCODE_COOKIE_NAME } from '~/services/auth/code/zipCode';

export const useGetCurrentUser = routeLoader$<UserACC | null>(
  async ({ cookie }) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;

    if (accessCookie) {
      return decodeToken(accessCookie, passwordKEY, serverKey);
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

export default component$(() => {
  const isOpen = useStore({ setIsOpen: false });
  const userCtx = useGetCurrentUser().value;
  const getZipCode = useGetCurrentZipCode().value;
  const loc = useLocation();

  return (
    <>
      <main>
        {loc.url.pathname !== '/a/login/' &&
        loc.url.pathname !== '/a/register/' &&
        loc.url.pathname !== '/a/recover-account/' ? (
          <>
            <Header is={isOpen} user={userCtx} />
            <Nav zipCode={getZipCode} />
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
