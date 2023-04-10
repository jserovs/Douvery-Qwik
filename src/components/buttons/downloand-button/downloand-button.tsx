import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './downloand-button.css?inline';
export const DownloadButton = component$(({ targetId, state }: any) => {
  useStylesScoped$(styles);

  return (
    <>
      <button class="button-download">
        Descargar factura {targetId}
        {state}
      </button>
    </>
  );
});
