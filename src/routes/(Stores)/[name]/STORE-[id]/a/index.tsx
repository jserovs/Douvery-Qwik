import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <h1>Información de la Tienda</h1>
      <div class="information">
        <div class="logo">
          <img src={'/'} alt="" />
          <a href="#">Douvery</a>
          <DouveryIconVerifyBrand size="20" />
        </div>
        <p>Dirección: Calle Falsa 123, Ciudad, País</p>
        <p>Teléfono: +00 123 456 789</p>
        <p>Email: contacto@nombredelatienda.com</p>
        <p>Phone: Lunes a Viernes de 10:00 a 19:00 hs</p>
      </div>{' '}
      <div class="information">
        <p>Registrada en Douvery: 16 marz 2023</p>
      </div>
    </div>
  );
});
