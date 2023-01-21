import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <nav>
      <ul class="container-cajas-nav">
        <li class="cajas-nav">
          <a href="/">Inicio</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Quiénes somos</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Servicios</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Blog</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Contacto</a>
        </li>
      </ul>
    </nav>
  );
});
