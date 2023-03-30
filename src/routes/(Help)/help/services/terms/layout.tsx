import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <main>
      <article>
        <Slot />
      </article>
    </main>
  );
});
