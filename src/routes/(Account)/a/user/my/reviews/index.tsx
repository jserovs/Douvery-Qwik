import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      {' '}
      <div class="container-title">
        <p>My Reviews</p>
        <h6>Services</h6>
      </div>
    </div>
  );
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
