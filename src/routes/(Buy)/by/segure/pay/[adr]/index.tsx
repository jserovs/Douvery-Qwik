import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { fetchIndexAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';
import { useLocation } from '@builder.io/qwik-city';
import type { Address } from '~/utils/types';
import { AddressChosenOne } from '~/components/(byServices)/Pay/sessions/address-chosen-one/address-chosen-one';

export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;

  const state = useStore<{
    address: Address;
  }>(
    {
      address: {} as Address,
    },
    { recursive: true }
  );

  const loc = useLocation();

  const addressResource = useResource$<void>(async ({ track }) => {
    track(() => loc.params.adr);
    const data = await fetchIndexAddressUser(
      `${userACC?.token}`,
      `${userACC?.id}`,
      loc.params.adr
    );
    state.address = data;
  });

  return (
    <>
      <div class="container-all">
        <div class="container-info-user">
          <div class="container-pay">
            <div class="container-header">
              <p>
                {' '}
                Selecciona o agrega una dirección de envío para continuar con tu
                pedido.
              </p>
            </div>

            <Resource
              value={addressResource}
              onPending={() => <div class="loader"></div>}
              onRejected={(error) => <>Error: {error.message}</>}
              onResolved={() => (
                <div>
                  <AddressChosenOne state={state} />
                </div>
              )}
            />
          </div>
        </div>
        <div class="container-info-pay"></div>
      </div>
    </>
  );
});
