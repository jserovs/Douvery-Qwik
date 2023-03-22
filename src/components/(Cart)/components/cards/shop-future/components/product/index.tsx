import { component$, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import {  useLocation,   } from '@builder.io/qwik-city';

import { useGetCurrentUser } from '~/routes/layout';
import type { IState } from '~/routes/(Cart)/v/cart';
import { getDataFuturePurchasesProduct } from '~/services/cart/future-purchases';

import { Card3SCART } from '~/components/cards/cart/card-3-s/card-3-s';





export const CardShopFutureProduct = component$(
  () => {
    useStylesScoped$(styles);
    
    const {url}=useLocation()
     const user = useGetCurrentUser().value;

     const state = useStore<IState>({
      searchInput: '',
      searchResults: [],
      selectedValue: '',
    });
   
  
    useVisibleTask$(async ({ track }) => {
      track(() => url.pathname);
  
      const controller = new AbortController();
      state.searchResults = await getDataFuturePurchasesProduct(              `${user?.id}`);
      return () => {
        controller.abort();
      };
    });
    return (
      <>
        <div class="cart-future-shop">
        <ul class="container-lista">
{state.searchResults.length > 0 ? (
                state.searchResults.map((product) => {
            
                  return (
                    <div class="container-cart" key={product.dui}>
                      <Card3SCART product={product} />
                     
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
  }
);
