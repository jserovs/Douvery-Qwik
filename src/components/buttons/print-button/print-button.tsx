import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import { PrintIcon } from '~/components/icons/print';
import styles from './print-button.css?inline';
export const PrintButton = component$(({ targetId }: any) => {
  useStylesScoped$(styles);
  const handlePrint = $(() => {
    // // Obtén el contenido a imprimir
    // const contentToPrint = document.getElementById(targetId).innerHTML;
    // // Accede al iframe y a su contenido
    // const printIframe = document.getElementById('print-iframe');
    // const printDocument = printIframe.contentWindow.document;
    // // Abre el documento del iframe, escribe el contenido a imprimir y cierra el documento
    // printDocument.open();
    // printDocument.write('<html><head><title>Douvery Invoice</title>');
    // // Copia las hojas de estilo del documento principal al contenido del iframe
    // const stylesheets = document.querySelectorAll(
    //   'link[rel="stylesheet"], style'
    // );
    // for (let i = 0; i < stylesheets.length; i++) {
    //   printDocument.head.appendChild(stylesheets[i].cloneNode(true));
    // }
    // printDocument.write('</head><body>');
    // printDocument.write(contentToPrint);
    // printDocument.write('</body></html>');
    // printDocument.close();
    // // Imprime el contenido del iframe
    // setTimeout(() => {
    //   printIframe.contentWindow.focus();
    //   printIframe.contentWindow.print();
    // }, 500);
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
