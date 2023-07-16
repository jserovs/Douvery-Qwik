import { component$, useStyles$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { QwikPartytown } from './components/partytown/partytown';
import globalStyles from './global.css?inline';
import { inject } from '@vercel/analytics';
export default component$(() => {
  useStyles$(globalStyles);
  inject();
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="canonical" href="https://www.douvery.com/" />

        <link rel="manifest" href="/manifest.json" />
        <QwikPartytown forward={['dataLayer.push']} />
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-F6975H93NJ"
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
