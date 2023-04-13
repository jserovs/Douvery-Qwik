import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis ordenes</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - Mis ordenes',
  meta: [
    {
      name: 'Mis ordenes',
      content: 'Douvery - Mis ordenes',
    },
  ],
};
