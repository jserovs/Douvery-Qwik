import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './layout.css?inline';
import { DouveryServicesLogo } from '~/components/(byServices)/components/DouveryAuthLogo/douvery-auth-logo';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <header>
        <DouveryServicesLogo />
      </header>
      <main>
        <Slot />
      </main>
    </>
  );
});
