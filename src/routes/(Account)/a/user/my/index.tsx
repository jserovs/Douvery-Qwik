import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import type { DocumentHead } from '@builder.io/qwik-city';
export default component$(() => {
  useStylesScoped$(styles);
  return <div>My</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - Mis',
  meta: [
    {
      name: 'Douvery - Mis',
      content: 'Douvery - Mis',
    },
  ],
};
