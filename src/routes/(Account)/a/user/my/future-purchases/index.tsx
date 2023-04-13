import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Mis future purchases</div>;
});
export const head: DocumentHead = {
  title: 'Douvery -  Future purchases',
  meta: [
    {
      name: 'Mis ordenes',
      content: 'Douvery - Future purchases',
    },
  ],
};
