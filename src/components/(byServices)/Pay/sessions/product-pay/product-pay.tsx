import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './product-pay.css?inline';
import { Link, useLocation } from '@builder.io/qwik-city';
import { getDataProductCart } from '~/services/cart/cart';
import type { Product } from '~/utils/types';
import { Card1PRODUCTPAY } from '~/components/cards/buy/pay/card1/product-pay';

export interface IState {
  productResults: Product[];
}

export const ProductPay = component$(() => {
  useStylesScoped$(styles);
  const url = useLocation();
  const state = useStore<IState>({
    productResults: [],
  });
  useVisibleTask$(async ({ track }) => {
    track(() => url.pathname);

    const controller = new AbortController();
    state.productResults = await getDataProductCart();

    return () => {
      controller.abort();
    };
  });
  return (
    <div class="container-all">
      <div class="container-title">
        <p>Productos a pagar</p>
        <p>Cantidad</p>
      </div>
      <div class="cart-products">
        {state.productResults.length > 0 ? (
          state.productResults.map((product) => {
            return (
              <>
                <div class="container-cards-pay" key={product.dui}>
                  <Card1PRODUCTPAY product={product} />
                  <div class="container-quantity">{product.quantity}</div>
                </div>
              </>
            );
          })
        ) : (
          <div class="loader"></div>
        )}
        <div class="container-edit-cart">
          {' '}
          <Link href="/v/cart/">Editar</Link>
        </div>
      </div>
    </div>
  );
});
