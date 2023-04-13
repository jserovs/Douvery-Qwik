import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis last seen</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - My last seen',
  meta: [
    {
      name: 'Mis last seen',
      content: 'Douvery - My last seen',
    },
  ],
};
