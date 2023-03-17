import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';

import {
  addToCart,
  decreaseCartItemQuantity,
  getDataProductCart,
  removeCartItem,
} from '~/services/cart/cart';
import { Card1SCART } from '~/components/cards/cart/card-1-s/card-1-s';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { ButtonCartIndex } from '~/components/(Cart)/components/buttons';
interface IState {
  searchInput: string;
  searchResults: string[];
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
    <div class="cart-container">
      <div class="cart-products">
        {state.searchResults.map((product) => {
          const subTotal = state.searchResults.reduce(
            (accumulator, product) => {
              return accumulator + product.price * product.quantity;
            },
            0
          );
          cartTotal.setcartTotal = subTotal;
          return (
            <>
              <div class="container-cart">
                <Card1SCART product={product} />
                <ButtonCartIndex product={product} />
              </div>
            </>
          );
        })}
      </div>
      <div class="cart-total">Cart Total: {cartTotal.setcartTotal}</div>
    </div>
  );
});
