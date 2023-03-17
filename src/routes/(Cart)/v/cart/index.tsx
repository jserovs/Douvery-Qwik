import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';

import { addToCart, getDataProductCart } from '~/services/cart/cart';
import { Card1SCART } from '~/components/cards/cart/card-1-s/card-1-s';
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
  const cartTotal = useStore({ setcartTotal: 0 });

  useVisibleTask$(async ({ track }) => {
    track(() => cartTotal.setcartTotal);

    const controller = new AbortController();
    state.searchResults = await getDataProductCart();

    return () => {
      controller.abort();
    };
  });

  return (
    <div class="cart-container">
      <div class="cart-products">
        {state.searchResults.map((item) => {
          const subTotal = state.searchResults.reduce((accumulator, item) => {
            return accumulator + item.price * item.quantity;
          }, 0);
          cartTotal.setcartTotal = subTotal;
          return (
            <>
              <div class="container-cart">
                <Card1SCART product={item} />
                <div class="buttos-cart">
                  {item.quantity}
                  <button
                    onClick$={() => {
                      addToCart({ dui: item.dui, quantity: 1 });
                      cartTotal.setcartTotal =
                        cartTotal.setcartTotal + product.price;
                    }}
                  >
                    agregar {cartTotal.setcartTotal}
                  </button>
                  <button
                  // onClick={() => {
                  //   const newQuantity = product.quantity - 1;
                  //   if (newQuantity >= 1) {
                  //     updateQuantity(product.dui, newQuantity);
                  //     setCartItemsTotal(
                  //       (prevTotal) => prevTotal - product.price
                  //     );
                  //   }
                  // }}
                  >
                    -
                  </button>
                  <button
                  // onClick={() => {
                  //   removeItem(product.dui);
                  //   setCartItemsTotal(
                  //     (prevTotal) => prevTotal - product.totalPrice
                  //   );
                  // }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div class="cart-total">Cart Total: {cartTotal.setcartTotal}</div>
    </div>
  );
});
