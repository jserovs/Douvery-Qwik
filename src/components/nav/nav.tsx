import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav.css?inline';
import { ModalButtonCou } from '../modal/modal';

export default component$(() => {
  useStylesScoped$(styles);
  const categories = [
    'Books',
    'Electronic Y Accesorios',
    'Moda Para Hombre',
    'Computadoras Y Accesorios',
    'Hogar Y Entorno',
  ];
  return (
    <nav>
      <ul class="container-cajas-nav">
        <li class="cajas-nav">
          <ModalButtonCou />
        </li>
        {categories.map((categorie, i) => (
          <li class="cajas-nav" key={i}>
            <a href={'/s-categorie/' + categorie}>{categorie}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
});
