import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-header-name-brands-product.css?inline';
import { DouveryCheckMark } from '~/components/icons/checkMark';

import { DouveryCircleLock } from '~/components/icons/circle-lock';
import { ContainerExpectedShippingTime } from './container-expected-shipping-time';
import { Dropdown } from '~/components/dropdown/dropdown';
import { ContainerAlertArt } from './container-alert-art';
import { Link } from '@builder.io/qwik-city';

import { ContainerPoput } from './components/popupSHARE';
import { DouveryIcon } from '~/components/icons/douvery';

import { TextCL } from '~/components/use/textCL/textCL';
import { UseStarRating } from '~/components/use/ratings/useRatingHover/useRatingHover';

export const ProductNameHeaderContainer = component$(({ props }: any) => {
  useStylesScoped$(sryles);

  return (
    <div class="super-container-title-brand-product mobiles-title-brand">
      <div class="crt--tlr-brnd">
        <size-w class="size-w-10" />
        <div class="container-title-product">
          {' '}
          <div class="container-brand-product">
            <Link
              href={
                '/' +
                props.storeName +
                '/' +
                'STORE-' +
                props.storeOspayne +
                '/h/'
              }
              aria-label={props.marca}
            >
              <strong class="container-brand-product">
                {' '}
                Explore the {props.storeName} store
              </strong>
            </Link>
          </div>
          <h4>
            <TextCL text={props.name} />
          </h4>
          <div class="crtr-di">
            <div class="di">
              {props.isBestInCategory ? (
                <>
                  {' '}
                  <div class="top-1">#1 De </div>
                </>
              ) : (
                <>
                  {' '}
                  <p>De</p>
                </>
              )}
              <a href={'/s-categorie/' + props.category}>{props.category}</a>
              {props.vrfDouvery ? (
                <>
                  {' '}
                  <vrf-drv class="vrs-fd">
                    <DouveryIcon color="#6466e8" /> Verified by Douvery
                  </vrf-drv>
                </>
              ) : (
                <></>
              )}{' '}
            </div>
            <div class="brt-shared-art">
              <ContainerPoput product={props} title={'Compartir'} />
            </div>
          </div>
        </div>
      </div>
      <div class="dsier-strs-lapto">
        {props.quantity <= 1 ? (
          <>
            <p class="exhausted-for ">Articulo agotado</p>
            <div class="bts-ds">
              {' '}
              <button>
                <DouveryIcon size="20" /> Notificarme
              </button>
              <button>
                <DouveryIcon size="20" /> Recomendarlo
              </button>
            </div>
          </>
        ) : props.quantity <= 12 ? (
          <>
            <div>
              <DouveryCheckMark size="16px" />
              <p>Articulo disponible</p>
            </div>

            <size-w class="size-w-10" />
            <div class="minus-dolceid-alert-buty">
              ¡Solo Queda(n) {props.quantity} unidades!
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
      <div class="brt-irft-lapto">
        <strong class="hs-sr1">Estado:</strong>{' '}
        <p class="ps-sr1">{props.item_condition}</p>
      </div>

      <div class="crtr-shr-">
        {' '}
        <div class="shrt-prd-alrt">
          {' '}
          <strong class="hs-sr1">Enviado & Vendido por </strong>
          <div class="sll-rps">
            <div class="seller">
              <a
                href={
                  '/' +
                  props.storeName +
                  '/' +
                  'STORE-' +
                  props.storeOspayne +
                  '/h/'
                }
                aria-label={props.marca}
              >
                {props.storeName}
              </a>
              <a
                href={
                  '/' +
                  props.storeName +
                  '/' +
                  'STORE-' +
                  props.storeOspayne +
                  '/h/'
                }
                aria-label={props.marca}
              >
                (4)185
              </a>
              {/* <div class="review-popup">
                Review: This seller is reliable and always ships on time.
              </div> */}
            </div>
          </div>
          <div class="chg-shr-prtd">
            <Dropdown title="Elegir otra opcion" />
          </div>
        </div>
        <div class="srte-art-alrt">
          <div class="srtrsdr">
            {' '}
            <DouveryCircleLock size="16" />
            <p class="ps-sr1">
              Esta compra está protegida por <strong>Douvery</strong>, puedes
              comprar con total confianza.
            </p>
          </div>
        </div>
      </div>

      {props.quantity == 0 ? <></> : <ContainerExpectedShippingTime />}
      <ContainerAlertArt props={props} />
    </div>
  );
});
