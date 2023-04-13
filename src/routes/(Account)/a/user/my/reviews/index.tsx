import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis Reviews</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - Mis Reviews',
  meta: [
    {
      name: 'Mis ordenes',
      content: 'Douvery - Mis Reviews',
    },
  ],
};
