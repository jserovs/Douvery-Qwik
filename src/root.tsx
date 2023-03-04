import {
  component$,
  createContext,
  useBrowserVisibleTask$,
  useContext,
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
import { getData } from './services/auth/token/token';

interface UserStore {
  name: string;
  isLogged: boolean;
}
export const UserInformationContext =
  createContext<UserStore>('user-information');

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  const userStore = useStore({
    name: '',
    isLogged: false,
  });
  useStyles$(globalStyles);

  useContextProvider(UserInformationContext, userStore);

  useBrowserVisibleTask$(() => {
    const date = setInterval(() => {
      const { name } = getData();
      userStore.name = name;
    });
    return () => {
      clearInterval(date);
      const { name } = getData();
      userStore.name = name;
    };
  });

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
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        ></link>
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
