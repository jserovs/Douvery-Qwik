import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import { PrintIcon } from '~/components/icons/print';
import styles from './print-button.css?inline';
import printJS from 'print-js';
export const PrintButton = component$(({ targetId }: any) => {
  useStylesScoped$(styles);
  const handlePrint = $(() => {
    printJS({
      printable: targetId,
      type: 'html',

      targetStyles: ['*'], // Esto incluirá todos los estilos en línea
    });
  });
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
