import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryLogo40x40 } from '~/components/icons/logo40x40';
import styles from './douvery-auth-logo.css?inline';
export const DouveryServicesLogo = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="ctr-douvery">
      <div>
        <a
          href="/"
          aria-label="Go home"
          title="Douvery"
          class="inline-flex items-center iteam-douvery"
        >
          <DouveryLogo40x40 color="var(--color-primary)" />
          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Douvery
          </span>
        </a>
        <div class="ctr-opa">|</div>
        <p>Segure purchase</p>
      </div>
      <p>Proceso de compra</p>
    </div>
  );
});
