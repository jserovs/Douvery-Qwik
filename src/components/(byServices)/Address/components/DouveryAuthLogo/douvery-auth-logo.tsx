import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './douvery-auth-logo.css?inline';
import { DouveryLogo40x40Cuadre } from '~/components/icons/logo40x40Cuadre';
export const DouveryServicesLogo = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="ctr-douvery">
      <div>
        <a
          href="/"
          aria-label="Go home"
          title="Douvery - Back to home"
          class="inline-flex items-center iteam-douvery"
        >
          <DouveryLogo40x40Cuadre color="var(--color-primary)" />
          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
            Douvery
          </span>
        </a>
        <div class="ctr-opa">|</div>
        <div class="text-right-title">
          <p>Segure purchase</p>
        </div>
      </div>
      <p>Proceso de compra</p>
    </div>
  );
});
