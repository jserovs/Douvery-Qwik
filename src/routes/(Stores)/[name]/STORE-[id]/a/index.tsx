import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';
import { fetchStore } from '~/services/store/store';
import type { Store } from '~/utils/types/stores';
import { useLocation } from '@builder.io/qwik-city';
import { formatDate } from '~/services/fuction';
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const state = useStore<{
    store: Store;
  }>({
    store: {} as Store,
  });

  const storeResource = useResource$<void>(async () => {
    const data = await fetchStore(loc.params.id);
    state.store = data;
  });

  return (
    <div class="container-all">
      <h1>Información de la Tienda</h1>
      <Resource
        value={storeResource}
        onPending={() => <div class="loader "></div>}
        onRejected={() => (
          <>
            Al parecer, hay un error en la solicitud. Por favor, actualiza la
            página para verificar nuevamente.
          </>
        )}
        onResolved={() => (
          <>
            <div class="information">
              <div class="container-info-title">
                <div class="logo">
                  <img
                    width={60}
                    height={60}
                    src={state.store.design.logo}
                    alt={state.store.name + 'logo'}
                  />
                  <a href="#">{state.store.name}</a>
                  <DouveryIconVerifyBrand size="20" />
                </div>
                <p>{state.store.description}</p>
              </div>
              <div class="container-info-store">
                <br />
                <p>
                  <strong>Dirección:</strong>
                  {state.store.contactInfo.address.addressLine1},{' '}
                  {state.store.contactInfo.address.city}{' '}
                  {state.store.contactInfo.address.state}{' '}
                  {state.store.contactInfo.address.zip} ,{' '}
                  {state.store.contactInfo.address.country}
                </p>

                <p>
                  <strong>Email:</strong> {state.store.contactInfo.email}
                </p>
                <p>
                  <strong>Phone:</strong> {state.store.contactInfo.phone}
                </p>
              </div>
            </div>{' '}
            <div class="information">
              <p>
                <strong>Registrada en douvery.com:</strong>{' '}
                {formatDate(state.store.createdAt)}
              </p>
            </div>
          </>
        )}
      />
    </div>
  );
});
