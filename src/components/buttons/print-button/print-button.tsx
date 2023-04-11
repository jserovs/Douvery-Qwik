import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import { PrintIcon } from '~/components/icons/print';
import styles from './print-button.css?inline';

export const PrintButton = component$(({ targetId }: any) => {
  useStylesScoped$(styles);
  const handlePrint = $(() => {});
  return (
    <>
      <iframe id="print-iframe" style="display:none;">
        {targetId}
      </iframe>
      <button class="button-print" onClick$={handlePrint}>
        <PrintIcon size="18" /> Imprimir factura
      </button>
    </>
  );
});
