import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-terms-comments.css?inline';
export const ContainerTermsComments = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container">
      <h1>Reglas de Comentarios en Douvery.</h1>
      <ol>
        <li>
          Al dejar comentarios sobre productos o servicios, enfócate en tu
          experiencia y evita comentarios personales. Proporciona detalles
          específicos y constructivos, utilizando un lenguaje respetuoso y
          amigable. Sé honesto al expresar insatisfacción, pero sin ataques
          personales ni agresividad. Finalmente, cumple con las políticas de la
          plataforma para mantener un ambiente seguro y respetuoso.
        </li>
      </ol>
    </div>
  );
});
