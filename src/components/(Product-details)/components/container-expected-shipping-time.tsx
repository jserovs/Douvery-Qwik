import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-expected-shipping-time.css?inline';
import { useGetCurrentZipCode } from '~/routes/layout';
import { TextCL } from '~/components/use/textCL/textCL';
import { ModalButtonCou } from '~/components/modal/modal';

export const ContainerExpectedShippingTime = component$(() => {
  useStylesScoped$(styles);

  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  const getZipCode = useGetCurrentZipCode().value;

  return (
    <div class="crt-expectend-ship">
      <div class="srt-shrt-prsrd-nrms">
        <strong class="hs-sr1">Envio: </strong>{' '}
        <p class="ps-sr1">Estándar gratuito en compras mayores a $23</p>
      </div>
      {getZipCode ? (
        <>
          <div class="shrp-prsx">
            <p class="ps-sr1">Compra antes de 8 hrs 10 mins:</p>
            <p class="tm-srh-exp">
              Recibelo el {''}
              {mañana.toLocaleDateString('es-ES', {
                weekday: 'long',

                month: 'long',
                day: 'numeric',
              })}
              {''} en {''} <TextCL text={getZipCode} />
            </p>{' '}
          </div>
        </>
      ) : (
        <div class="ctr-button-ele">
          <p class="text-live">
            Para obtener una estimación de tiempo, es necesario seleccionar una
            ubicación de envío
          </p>
          <div class="ctr-buttom">
            <ModalButtonCou />
          </div>
        </div>
      )}
    </div>
  );
});
