import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <nav>
      <ul class="container-cajas-nav">
        <li class="cajas-nav">
          <a href="/">Mobiles</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Ropas</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Hogar</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Electronics</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Nuevo</a>
        </li>
      </ul>
    </nav>
  );
});
