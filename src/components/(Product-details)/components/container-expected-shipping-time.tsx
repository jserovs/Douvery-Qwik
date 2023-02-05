import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-expected-shipping-time.css?inline';

export const ContainerExpectedShippingTime = component$(() => {
  useStylesScoped$(styles);

  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);

  return (
    <div class="crt-expectend-ship">
      <div class="srt-shrt-prsrd-nrms">
        <hs-sr1>Envio: </hs-sr1>{' '}
        <p-sr1>Estándar gratuito en compras mayores a $23</p-sr1>
      </div>
      <div class="shrp-prsx">
        <p-sr1>Compra antes de 8 hrs 10 mins:</p-sr1>
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
