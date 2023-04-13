import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis Returns</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - My Returns',
  meta: [
    {
      name: 'Mis ordenes',
      content: 'Douvery - My Returns',
    },
  ],
};
