import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Cambio de contraseña </div>;
});
export const head: DocumentHead = {
  title: 'Douvery - Cambiar de contraseña',
  meta: [
    {
      name: 'Douvery - Cambiar de contraseña',
      content: 'Douvery - Cambiar de contraseña',
    },
  ],
};
