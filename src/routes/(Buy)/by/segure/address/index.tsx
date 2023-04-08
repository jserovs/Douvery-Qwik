import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { fetchAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';
import { ViewAddressExisting } from '~/components/(byServices)/Address/sessions/view-address-existing/view-address-existing';
import { ViewAddressNew } from '~/components/(byServices)/Address/sessions/view-address-new/views-address-new';
import type { RequestHandler } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';

interface IStateResult {
  results: string[];
}
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (!acccessToken) {
    throw redirect(302, '/a/login?rr=/by/segure/address/');
  }
};
export default component$(() => {
  useStylesScoped$(styles);
  const existingAddress = useStore({ setExistingAddress: '' });
  const country = useStore({ setCountry: '' });
  const states = useStore({ setState: '' });
  const addressLine1 = useStore({ setAddressLine1: '' });
  const addressLine2 = useStore({ setAddressLine2: '' });
  const city = useStore({ setCity: '' });
  const postalCode = useStore({ setPostalCode: '' });
  const street = useStore({ setStreet: '' });
  const locationType = useStore({ setLocationType: '' });
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
            {state.results.length === 0 ? (
              <>
                {' '}
                Tienes que crear una dirección de envío para continuar con tu
                pedido.
              </>
            ) : (
              <>
                {' '}
                Selecciona o agrega una dirección de envío para continuar con tu
                pedido.
              </>
            )}
          </p>
          <p></p>
        </div>
        <div class="container-addresses-existing">
          <p>Direcciones existentes:</p>
          <p></p>
        </div>
        <ViewAddressExisting state={state} existingAddress={existingAddress} />

        <div class="titulo-centrado">
          <div class="linea"></div>
          <p>Crear nueva direccion</p>
          <div class="linea"></div>
        </div>
        <ViewAddressNew
          country={country}
          states={states}
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          city={city}
          postalCode={postalCode}
          street={street}
          locationType={locationType}
        />
      </div>
    </div>
  );
});
