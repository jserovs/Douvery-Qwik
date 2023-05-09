import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav.css?inline';
import { ModalButtonCou } from '../modal/modal';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <nav>
      <ul class="container-cajas-nav">
        <li class="cajas-nav">
          <ModalButtonCou />
        </li>
        <li class="cajas-nav">
          <a href="/s-categorie/books">Books</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Electronic Y Accesorios</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Moda Para Hombre</a>
        </li>
        <li class="cajas-nav">
          <a href="/">Computadoras Y Accesorios </a>
        </li>
        <li class="cajas-nav">
          <a href="/">Hogar Y Entorno</a>
        </li>
      </ul>
    </nav>
  );
});
