import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-shopping-feature.css?inline';

export const ContainerShoppingFeacture = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="crtr-charac-bs">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Devolución y seguridad</hs-sr3>
          <div class="srs-v">
            <a-sr1-info>Saber mas</a-sr1-info>
          </div>
        </div>

        <p-sr1>Protege tu compra en Douvery</p-sr1>
        <div class="srs-md">
          <a-sr1-info>Saber mas</a-sr1-info>
        </div>
      </div>

      <div>
        <ul>
          <li>
            <hs-sr2>Política de devolución:</hs-sr2>{' '}
            <p-sr1>
              45 días sin preguntas. Devuelva el producto en su paquete original
              para recibir un reembolso completo.{' '}
              <a-sr1-info>Saber mas</a-sr1-info>
            </p-sr1>
          </li>
          <li>
            <hs-sr2>Compensación por daños durante el envío:</hs-sr2>{' '}
            <p-sr1>
              En caso de que un producto se dañe durante el envío, ofrecemos
              reemplazo o reembolso completo.
            </p-sr1>
          </li>
          <li>
            <hs-sr2>Opciones adicionales: </hs-sr2>{' '}
            <p-sr1>
              Planes de aumento de garantía disponibles por un costo adicional
              para una mayor protección. <a-sr1-info>Ver planes</a-sr1-info>
            </p-sr1>
          </li>
        </ul>
      </div>
    </div>
  );
});
