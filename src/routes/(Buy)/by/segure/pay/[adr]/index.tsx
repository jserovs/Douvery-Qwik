import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { AddressChosenOne } from '~/components/(byServices)/Pay/sessions/address-chosen-one/address-chosen-one';
import { fetchIndexAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';
import { useLocation } from '@builder.io/qwik-city';

interface IStateResult {
  results: string[];
}
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const stateAddress = useStore<IStateResult>({
    results: [],
  });
  const loc = useLocation();

  useTask$(async ({ track }) => {
    track(() => loc.params.adr);

    const controller = new AbortController();
    stateAddress.results = await fetchIndexAddressUser(
      `${userACC?.token}`,
      `${userACC?.id}`,
      loc.params.adr
    );

    return () => {
      controller.abort();
    };
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
              <p></p>
            </div>
            <AddressChosenOne stateAddress={stateAddress} />
          </div>
        </div>
        <div class="container-info-pay"></div>
      </div>
    </>
  );
});
