import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';

import {
 
  getDataProductCart,
 
} from '~/services/cart/cart';
import { Card1SCART } from '~/components/cards/cart/card-1-s/card-1-s';
import { useLocation } from '@builder.io/qwik-city';
import { ButtonCartIndex } from '~/components/(Cart)/components/buttons';
import { Product } from '~/utils/types';
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
  const cartTotal = useStore({ setcartTotal: 0 });

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
              const subTotal = state.searchResults.reduce(
                (accumulator, product) => {
                  return accumulator + product.price * product.quantity;
                },
                0
              );
              cartTotal.setcartTotal = subTotal;
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
        </div>
        <div class="cart-total">Cart Total: {cartTotal.setcartTotal}</div>
      </div>
    </div>
  );
});
