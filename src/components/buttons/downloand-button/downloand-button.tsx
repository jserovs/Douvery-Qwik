import { $, component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './downloand-button.css?inline';

export const DownloadButton = component$(({ targetId, state }: any) => {
  useStylesScoped$(styles);
  targetId;
  state;
  const handlePrint = $(async () => {});
  return (
    <>
      <button class="button-download" onClick$={handlePrint}>
        Descargar factura
      </button>
    </>
  );
});
