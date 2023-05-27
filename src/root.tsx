import { component$, useStyles$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { QwikPartytown } from './components/partytown/partytown';
import globalStyles from './global.css?inline';

export default component$(() => {
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="canonical" href="https://www.douvery.com/" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="../public/ico/favicon-16x16.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="../public/ico/favicon-32x32.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="48x48"
          href="../public/ico/favicon-48x48.ico"
        />{' '}
        <link
          rel="icon"
          type="image/x-icon"
          sizes="180x180"
          href="../public/ico/favicon-180x180.ico"
        />{' '}
        <link rel="manifest" href="/manifest.json" />
        <QwikPartytown forward={['dataLayer.push']} />
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        />
        <RouterHead />
      </head>
      <body lang="es">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
