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
            <a-sr1-info>Saber mas</a-sr1-info>
          </div>
        </div>

        <p-sr1>Protege tu compra en Douvery</p-sr1>
        <div class="srs-md">
          <a-sr1-info>Saber mas</a-sr1-info>
        </div>
      </div>

      <div>
        {showText.setShowText ? (
          <ul>
            <li>
              <hs-sr2>Política de devolución:</hs-sr2>{' '}
              <p-sr1>
                45 días sin preguntas. Devuelva el producto en su paquete
                original para recibir un reembolso completo.{' '}
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
                Para una tranquilidad adicional, tenemos planes de ampliación de
                garantía disponibles a un precio adicional.
                <a-sr1-info>Revisa las opciones.</a-sr1-info>
              </p-sr1>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <hs-sr2>Política de devolución:</hs-sr2>{' '}
              <p-sr1>
                45 días sin preguntas. Devuelva el producto en su paquete
                original para recibir un reembolso completo.{' '}
                <a-sr1-info>Saber mas</a-sr1-info>
              </p-sr1>
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
