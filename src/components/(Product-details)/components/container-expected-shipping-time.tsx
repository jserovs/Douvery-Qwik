import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-expected-shipping-time.css?inline';

export const ContainerExpectedShippingTime = component$(() => {
  useStylesScoped$(styles);

  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);

  return (
    <div class="crt-expectend-ship">
      <h5>Envio :</h5>
      <div class="shrp-prsx">
        <p class="alrt-vsrt">Compra antes de 8 hrs 10 mins:</p>
        <p class="tm-srh-exp">
          Recibelo el {''}
          {mañana.toLocaleDateString('es-ES', {
            weekday: 'long',

            month: 'long',
            day: 'numeric',
          })}
          {'.'}
        </p>
      </div>
    </div>
  );
});
