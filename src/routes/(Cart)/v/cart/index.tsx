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
import { HeaderCart } from '~/components/(Cart)/components/header/header-cart';
import { CardSubtotal } from '~/components/(Cart)/components/cards/card-subtotal/card-subtotal';
import { CardTotal } from '~/components/(Cart)/components/cards/card-total/card-total';
import { NoProductCart } from '~/components/(Cart)/sessions/no-product-cart/no-product-cart';
import { View5 } from '~/components/(Product-details)/components/sessions/VIEW 5/view5';
import { CardShopFuture } from '~/components/(Cart)/components/cards/shop-future/shop-future';
import { CardFavoriteProduct } from '~/components/(Cart)/components/cards/card-favorite/card-favorite';
import { CardDouveryExtend1 } from '~/components/cards/douveryExtend/card-douveryExtend-1/douveryExtend1';
export interface IState {
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
  const subTotalNoDiscount = useStore({ setsubTotalNoDiscount: 0 });
  const discount = useStore({ setDiscount: 0 });

  useVisibleTask$(async ({ track }) => {
    track(() => url.pathname);

    const controller = new AbortController();
    state.searchResults = await getDataProductCart();

    return () => {
      controller.abort();
    };
  });
  const showLoader = useStore({ setShowLoader: true });

  useVisibleTask$(() => {
    const timer = setInterval(() => {
      showLoader.setShowLoader = false;
    }, 10);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div class="container-all">
      {state.searchResults.length > 0 ? (
        <>
          <div class="container-header">
            <HeaderCart
              stateProduct={state.searchResults}
              subTotal={subTotal}
            />
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
                        product.price *
                        (product.discount / 100) *
                        product.quantity;
                      return accumulator + discountAmount;
                    },
                    0
                  );

                  subTotal.setsubTotal = subTotalA - descounts;
                  discount.setDiscount = descounts;
                  subTotalNoDiscount.setsubTotalNoDiscount = subTotalA;
                  return (
                    <div class="container-cart" key={product.dui}>
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

              <CardSubtotal
                state={state.searchResults.length}
                subTotal={subTotal}
              />
              <div class="container-web-total">
                <CardShopFuture />
              </div>
            </div>
            <div class="container-infos">
              <div class="container-card-total">
                <CardTotal
                  subTotal={subTotal}
                  discount={discount}
                  subTotalNoDiscount={subTotalNoDiscount.setsubTotalNoDiscount}
                />
              </div>
              <CardFavoriteProduct />
              <CardDouveryExtend1 />
            </div>
          </div>
        </>
      ) : (
        <>
          {showLoader.setShowLoader ? (
            <>
              {' '}
              <div class="loader"></div>
            </>
          ) : (
            <>
              {' '}

              <div class="container-center-no-product">
                <div class="header-cart-noproduct">
                  <HeaderCart stateProduct={state.searchResults} subTotal={0.00} />
                </div>
                <div class="container-noproduct-cart">
                  <NoProductCart />
                  <CardFavoriteProduct />
                </div>
              </div>
              <div class="container-carousel">
                <View5 product={''} styleNumber={4} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
});
export const head: DocumentHead = {
  title: 'Douvery:  Tu carrito',
  meta: [
    {
      name: 'description',
      content: 'Tu carrito de compras en Douvery',
    },
  ],
};
