import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis theme mode</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - My theme mode',
  meta: [
    {
      name: 'Mis last seen',
      content: 'Douvery - My theme mode',
    },
  ],
};
