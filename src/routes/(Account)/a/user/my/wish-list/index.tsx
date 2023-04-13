import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis Wish List</div>;
});
export const head: DocumentHead = {
  title: 'Douvery - My wish List',
  meta: [
    {
      name: 'Mis ordenes',
      content: 'Douvery - My wish List',
    },
  ],
};
