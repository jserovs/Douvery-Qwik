import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { fetchAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';
import { ConsentLocation } from '~/components/(byServices)/components/ConsentLocation/consent-location';
import { ViewAddressNew } from '~/components/(byServices)/sessions/view-address-new/views-address-new';
import { ViewAddressExisting } from '~/components/(byServices)/sessions/view-address-existing/view-address-existing';

interface IStateResult {
  results: string[];
}
export default component$(() => {
  useStylesScoped$(styles);
  const country = useStore({ setCountry: '' });
  const states = useStore({ setState: '' });
  const addressLine1 = useStore({ setAddressLine1: '' });
  const addressLine2 = useStore({ setAddressLine2: '' });
  const city = useStore({ setCity: '' });
  const postalCode = useStore({ setPostalCode: '' });
  const userACC = useGetCurrentUser().value;
  const state = useStore<IStateResult>({
    results: [],
  });

  useTask$(async ({ track }) => {
    track(() => '');

    const controller = new AbortController();
    state.results = await fetchAddressUser(`${userACC?.id}`, controller);

    return () => {
      controller.abort();
    };
  });
  return (
    <div class="container-all">
      <div class="container-address">
        <div class="container-header">
          <p>
            Selecciona o agrega una dirección de envío para continuar con tu
            pedido.
          </p>
          <p></p>
        </div>

        <div class="container-addresses-existing">
          <p>Direcciones existentes:</p>
          <p></p>
        </div>
      
        < ViewAddressExisting state={state} />
        <div class="titulo-centrado">
          <div class="linea"></div>
          <p>Crear nueva direccion</p>
          <div class="linea"></div>
        </div>
        < ViewAddressNew 
        country={country}
  states={states}
    addressLine1={addressLine1}
    addressLine2={addressLine2}
    city={city}
    postalCode={postalCode}/>
      </div>
    </div>
  );
});
