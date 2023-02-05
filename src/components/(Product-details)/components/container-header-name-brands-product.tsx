import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import sryles from './css/container-header-name-brands-product.css?inline';
import { DouveryCheckMark } from '~/components/icons/checkMark';

import { fetchSeller } from '~/services/fechSeller';
import type { Seller } from '~/utils/types';
import { cleanUpParamsID } from '~/utils/cleurs';
import { Loader } from '~/components/status/loader/loader';
import { DouveryCircleLock } from '~/components/icons/circle-lock';
import { ContainerExpectedShippingTime } from './container-expected-shipping-time';
import { Dropdown } from '~/components/dropdown/dropdown';
import { ContainerAlertArt } from './container-alert-art';
import { Link } from '@builder.io/qwik-city';

import { ContainerPoput } from './components/popupSHARE';

export const ContainerHeaderNameBrandProduct = component$(({ props }: any) => {
  useStylesScoped$(sryles);

  const state = useStore<{
    seller: Seller;
  }>(
    {
      seller: {} as Seller,
    },
    { recursive: true }
  );

  const ageResource = useResource$<void>(async () => {
    const { id } = cleanUpParamsID({ id: props.store });
    const seller = await fetchSeller(id);
    state.seller = seller;
  });

  useTask$(async ({ track }) => {
    track(() => props.store);
    const { id } = cleanUpParamsID({ id: props.store });
    const seller = await fetchSeller(id);
    state.seller = seller;
  });

  return (
    <div class="super-container-title-brand-product mobiles-title-brand">
      <div class="crt--tlr-brnd">
        <size-w class="size-w-10" />
        <div class="container-title-product">
          {' '}
          <div class="container-brand-product">
            <Link href="/" aria-label={props.marca}>
              Visita {props.marca}
            </Link>
          </div>
          <p>{props.name}</p>
          <div class="crtr-di">
            <div class="di">
              <p>De</p>
              <a href="/">{props.category}</a>
            </div>
            <div class="brt-shared-art">
              <ContainerPoput title={'Compartir'} />
            </div>
          </div>
        </div>
      </div>
      <div class="brt-irft-lapto">
        <hs-sr1>Estado:</hs-sr1> <p-sr1>{props.item_condition}</p-sr1>
      </div>
      <div class="dsier-strs-lapto">
        {props.quantity <= 1 ? (
          <>
            <p class="exhausted-for ">Articulo agotado</p>
            <button>Notificarme cuando este disponible</button>
          </>
        ) : props.quantity <= 12 ? (
          <>
            <div>
              <DouveryCheckMark size="16px" />
              <p>Articulo disponible</p>
            </div>

            <size-w class="size-w-10" />
            <div class="minus-dolceid-alert-buty">
              Queda(n) {props.quantity} unidades , puede que lleguen mas!
            </div>
          </>
        ) : (
          <>
            <div class="art-stock">
              <DouveryCheckMark size="16px" />
              <p>Articulo disponible</p>
            </div>
          </>
        )}
      </div>
      <div class="shrt-prd-alrt">
        {' '}
        <hs-sr1>Enviado & Vendido por </hs-sr1>
        <div class="sll-rps">
          <Resource
            value={ageResource}
            onPending={() => <Loader />}
            onRejected={(error) => <>Error: {error.message}</>}
            onResolved={() => (
              <>
                <div class="seller">
                  <a href="/">
                    {state.seller.name == undefined
                      ? 'Vendedor no definido'
                      : state.seller.name}
                  </a>
                  <a href="/">(4)185</a>
                  <div class="review-popup">
                    Review: This seller is reliable and always ships on time.
                  </div>
                </div>
              </>
            )}
          />
        </div>
        <div class="chg-shr-prtd">
          <Dropdown title="Elegir otra opcion" />
        </div>
      </div>
      <div class="srte-art-alrt">
        {' '}
        <DouveryCircleLock size="16" />
        <p-sr1>
          Esta compra está protegida por <strong>Douvery</strong> , puedes
          comprar con total confianza.
          <a-sr1-info class="sbr-slr-slri" href="/">
            Aprender mas
          </a-sr1-info>
        </p-sr1>
      </div>
      {props.quantity == 0 ? <></> : <ContainerExpectedShippingTime />}
      <ContainerAlertArt props={props} />
    </div>
  );
});
