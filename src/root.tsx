import {
  component$,
  createContext,
  useContextProvider,
  useStore,
  useStyles$,
} from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { QwikPartytown } from './components/partytown/partytown';
import globalStyles from './global.css?inline';
import type { UserACC } from './utils/types';

export const UserInformationContext =
  createContext<UserACC>('user-information');

export default component$(() => {
  useStyles$(globalStyles);
  const userStore = useStore<{
    user: UserACC;
  }>({
    user: {} as UserACC,
  });
  useContextProvider(UserInformationContext, userStore.user);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0d47a1" />
        <link rel="manifest" href="/manifest.json" />
        <QwikPartytown forward={['dataLayer.push']} />
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        />

        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
