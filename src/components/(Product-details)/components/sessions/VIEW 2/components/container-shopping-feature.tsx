import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-shopping-feature.css?inline';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';

export const ContainerShoppingFeacture = component$(() => {
  useStylesScoped$(styles);

  const showText = useStore({ setShowText: false });

  return (
    <div class="crtr-charac-bs">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Devolución y seguridad</hs-sr3>
          <div class="srs-v">
            <a class="ps-sr1">Saber mas</a>
          </div>
        </div>

        <p class="ps-sr1">Protege tu compra en Douvery</p>
        <div class="srs-md">
          <a class="ps-sr1">Saber mas</a>
        </div>
      </div>

      <div>
        {showText.setShowText ? (
          <ul>
            <li>
              <hs-sr2>Política de devolución:</hs-sr2>{' '}
              <p class="ps-sr1">
                45 días sin preguntas. Devuelva el producto en su paquete
                original para recibir un reembolso completo.{' '}
                <a class="ps-sr1">Saber mas</a>
              </p>
            </li>
            <li>
              <hs-sr2>Compensación por daños durante el envío:</hs-sr2>{' '}
              <p class="ps-sr1">
                En caso de que un producto se dañe durante el envío, ofrecemos
                reemplazo o reembolso completo.
              </p>
            </li>
            <li>
              <hs-sr2>Opciones adicionales: </hs-sr2>{' '}
              <p class="ps-sr1">
                Para una tranquilidad adicional, tenemos planes de ampliación de
                garantía disponibles a un precio adicional.
                <a class="ps-sr1">Revisa las opciones.</a>
              </p>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <hs-sr2>Política de devolución:</hs-sr2>{' '}
              <p class="ps-sr1">
                45 días sin preguntas. Devuelva el producto en su paquete
                original para recibir un reembolso completo.{' '}
                <a class="ps-sr1">Saber mas</a>
              </p>
            </li>
          </ul>
        )}

        <div class="sdw-bts">
          {' '}
          <button
            onClick$={() => (showText.setShowText = !showText.setShowText)}
          >
            {showText.setShowText ? (
              <srw-sr1>
                <DouveryArrowUp size="15" /> Ver menos
              </srw-sr1>
            ) : (
              <srw-sr1>
                <DouveryArrowDown size="15" /> Ver más
              </srw-sr1>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
