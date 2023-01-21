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
import { DouveryArrowDown } from '~/components/icons/arrow-down';

import { fetchSeller } from '~/services/fechSeller';
import type { Seller } from '~/utils/types';
import { cleanUpParamsID } from '~/utils/cleurs';
import { Loader } from '~/components/status/loader/loader';
import { DouveryCircleLock } from '~/components/icons/circle-lock';
import { ContainerExpectedShippingTime } from './container-expected-shipping-time';

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
            <a href="/" aria-label={props.marca}>
              Visita {props.marca}
            </a>
          </div>
          <h5>{props.name}</h5>
          <div class="di">
            <p>De</p>
            <a href="/">{props.category}</a>
          </div>
        </div>
      </div>
      <div class="brt-irft-lapto">
        <h5>Estado : </h5> <h4>{props.item_condition}</h4>
      </div>

      <div class="dsier-strs-lapto">
        {props.quantity <= 1 ? (
          <>
            <p class="exhausted-for ">Articulo agotado</p>
            <button>Notificarme cuando este disponible</button>
          </>
        ) : props.quantity <= 12 ? (
          <>
            <DouveryCheckMark size="16px" /> <p>Articulo disponible</p>
            <size-w class="size-w-10" />
            <div class="minus-dolceid-alert-buty">
              Queda(n) {props.quantity} unidades , puede que lleguen mas!
            </div>
          </>
        ) : (
          <>
            <DouveryCheckMark size="20px" /> <p>Articulo disponible</p>
          </>
        )}
      </div>

      <div class="shrt-prd-alrt">
        {' '}
        <p>Enviado & Vendido por</p>
        <Resource
          value={ageResource}
          onPending={() => <Loader />}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <>
              <a href="/">
                {state.seller.name == undefined
                  ? 'Vendedor no definido'
                  : state.seller.name}
              </a>
              <a href="/">(4)185</a>
            </>
          )}
        />
        <div class="chg-shr-prtd">
          <button>
            Elegir otra opcion <DouveryArrowDown size="14" />
          </button>
        </div>
      </div>
      <div class="srte-art-alrt">
        {' '}
        <DouveryCircleLock size="16" />
        <p>
          Esta compra está protegida por <strong>Douvery</strong> , puedes
          comprar con confianza.
        </p>
        <a class="sbr-slr-slri" href="/">
          Saber mas
        </a>
      </div>

      <ContainerExpectedShippingTime />
    </div>
  );
});
