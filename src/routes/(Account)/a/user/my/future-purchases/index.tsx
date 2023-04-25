import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      {' '}
      <div class="container-title">
        <p>My Future purchases</p>
        <h6>Services</h6>
      </div>
    </div>
  );
});
export const head: DocumentHead = {
  title: 'Douvery -  Future purchases',
  meta: [
    {
      name: 'My Future purchases',
      content: 'Douvery - Future purchases',
    },
  ],
};
