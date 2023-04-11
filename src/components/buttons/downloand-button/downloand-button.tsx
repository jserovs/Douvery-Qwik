import { $, component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './downloand-button.css?inline';
import printJS from 'print-js';
import jsPDF from 'jspdf';

export const DownloadButton = component$(({ targetId, state }: any) => {
  useStylesScoped$(styles);
  targetId;
  state;
  const handlePrint = $(async () => {
    // Crea un nuevo objeto jsPDF
    const pdf = new jsPDF('p', 'pt', 'letter');

    // Obtiene el contenido HTML que deseas descargar
    // let contenido = document.getElementById(targetId).innerHTML;

    // Agrega el contenido al documento PDF
    pdf.fromHTML(contenido, 15, 15);

    // Descarga el archivo PDF utilizando la función save() de Blob
    pdf.save('archivo-descargado.pdf');
  });
  return (
    <>
      <button class="button-download" onClick$={handlePrint}>
        Descargar factura
      </button>
    </>
  );
});
