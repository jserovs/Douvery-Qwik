import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryLogo40x40 } from '~/components/icons/logo40x40';
import styles from './douvery-auth-logo.css?inline';
export const DouveryAuthLogo = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="md:max-w-md lg:col-span-2 ctr-douvery">
      <a
        href="/"
        aria-label="Go home"
        title="Douvery"
        class="inline-flex items-center iteam-douvery"
      >
        <DouveryLogo40x40 color="var(--color-primary)" />
      </a>
    </div>
  );
});
