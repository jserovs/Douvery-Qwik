import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

import styles from './downloand-button.css?inline';

export const DownloadButton = component$(({ targetId, state }: any) => {
  useStylesScoped$(styles);
  targetId;
  state;
  const download = useSignal('');
  const handlePrint = $(() => {
    download.value = 'No disponible...';
  });
  return (
    <>
      <button class="button-download" onClick$={handlePrint}>
        {download.value == 'No disponible...' ? (
          download.value
        ) : (
          <>Descargar factura</>
        )}{' '}
      </button>
    </>
  );
});
