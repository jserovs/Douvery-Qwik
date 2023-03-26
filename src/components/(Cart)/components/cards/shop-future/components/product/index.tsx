import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

import { useGetCurrentUser } from '~/routes/layout';
import type { IState } from '~/routes/(Cart)/v/cart';
import { getDataFuturePurchasesProduct } from '~/services/cart/future-purchases';

import { Card3SCART } from '~/components/cards/cart/card-3-s/card-3-s';
import { ButtonFuturePurchase } from '../buttons/buttons-purchases';
import { addToCart } from '~/services/cart/cart';

export const CardShopFutureProduct = component$(() => {
  useStylesScoped$(styles);

  const { url } = useLocation();
  const user = useGetCurrentUser().value;

  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });

  useVisibleTask$(async ({ track }) => {
    track(() => url.searchParams);

    const controller = new AbortController();
    state.searchResults = await getDataFuturePurchasesProduct(`${user?.id}`);
    return () => {
      controller.abort();
    };
  });
  const nav = useNavigate();
  return (
    <>
      <div class="cart-future-shop">
        <ul class="container-lista">
          {state.searchResults.length > 0 ? (
            state.searchResults.map((product) => {
              return (
                <div class="container-cart" key={product.dui}>
                  <Card3SCART product={product} />
                  <div class="container-cart-buttons">
                    <button
                      onClick$={() => {
                        addToCart({ dui: product.dui, quantity: 1 });
                        nav('/v/cart');
                      }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                  <div class="container-options-buttons">
                    <ButtonFuturePurchase product={product} />
                  </div>
                </div>
              );
            })
          ) : (
            <div class="loader"></div>
          )}
        </ul>
      </div>
    </>
  );
});
