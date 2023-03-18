import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';

import { getDataProductCart } from '~/services/cart/cart';
import { Card1SCART } from '~/components/cards/cart/card-1-s/card-1-s';
import { useLocation } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ButtonCartIndex } from '~/components/(Cart)/components/buttons';
import type { Product } from '~/utils/types';
import { UsePrice } from '~/components/use/price/price';
interface IState {
  searchInput: string;
  searchResults: Product[];
  selectedValue: string;
}

export default component$(() => {
  useStylesScoped$(styles);
  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });
  const { url } = useLocation();

  const subTotal = useStore({ setsubTotal: 0 });
  const discount = useStore({ setDiscount: 0 });

  useVisibleTask$(async ({ track }) => {
    track(() => url.pathname);

    const controller = new AbortController();
    state.searchResults = await getDataProductCart();

    return () => {
      controller.abort();
    };
  });

  return (
    <div class="container-all">
      <div class="content">
        <div class="crrts-title">
          <div class="ofrs">
            <p>Bienvenido a tu carrito de compras</p>
          </div>
        </div>
      </div>
      <div class="cart-container">
        <div class="cart-products">
          {state.searchResults.length > 0 ? (
            state.searchResults.map((product) => {
              const subTotalA = state.searchResults.reduce(
                (accumulator, product) => {
                  return accumulator + product.price * product.quantity;
                },
                0
              );
              const descounts = state.searchResults.reduce(
                (accumulator, product) => {
                  const discountAmount =
                    product.price * (product.discount / 100) * product.quantity;
                  return accumulator + discountAmount;
                },
                0
              );

              subTotal.setsubTotal = subTotalA;
              discount.setDiscount = descounts;

              return (
                <div class="container-cart">
                  <Card1SCART product={product} />
                  <div class="container-button">
                    <ButtonCartIndex product={product} />
                  </div>
                </div>
              );
            })
          ) : (
            <div class="loader"></div>
          )}
          <div class="cart-subtotal">
            <ul class="container-lista-subtotal">
              <li>
                Total producto:{' '}
                <span id="total" class="container-valor">
                  {state.searchResults.length}
                </span>
              </li>
            </ul>
            <div class="container-subtotal">
              <h3 class="container-titulo-subtotal">Subtotal compra:</h3>
              <strong class="subtotal">
                <UsePrice price={subTotal.setsubTotal} />
              </strong>
            </div>
          </div>
        </div>
        <div>
          <div class="cart-total">
            <h3 class="container-titulo">Resumen de la compra</h3>
            <ul class="container-lista">
              <li>
                Descuentos:{' '}
                <span id="descuentos" class="container-valor">
                  ${discount.setDiscount.toFixed(2)}
                </span>
              </li>

              <li>
                Subtotal:{' '}
                <span id="subtotal" class="container-valor">
                  ${subTotal.setsubTotal.toFixed(2)}
                </span>
              </li>
            </ul>
            <button id="siguiente" class="container-boton">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
export const head: DocumentHead = {
  title: 'Douvery:  Tu carrito',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
