import { component$, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './shop-future.css?inline';
import {  useLocation, useNavigate,  } from '@builder.io/qwik-city';

import { useGetCurrentUser } from '~/routes/layout';
import { IState } from '~/routes/(Cart)/v/cart';
import { getDataFuturePurchasesProduct } from '~/services/cart/future-purchases';

import { Card3SCART } from '~/components/cards/cart/card-3-s/card-3-s';





export const CardShopFuture = component$(
  () => {
    useStylesScoped$(styles);
    const nav = useNavigate()
    const {url}=useLocation()
     const user = useGetCurrentUser().value;

     const state = useStore<IState>({
      searchInput: '',
      searchResults: [],
      selectedValue: '',
    });
   
    const subTotal = useStore({ setsubTotal: 0 });
    const subTotalNoDiscount = useStore({ setsubTotalNoDiscount: 0 });
    const discount = useStore({ setDiscount: 0 });
  
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
          <h3 class="container-titulo">Lista de compras futuras
</h3>
{user ?<ul class="container-lista">
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
          </ul>  : <> 
  <div class="container-alert-no-sessions">
<p>Para poder acedear a la opcion <strong>Lista de compras futuras</strong> es necesario iniciar sesion.</p>
  <div class="ctr-opa">|</div>
<button onClick$={()=> nav('/a/login/?rr=' +   url.pathname + url.search)}>INICIAR SESION </button>
</div> </>}

         
        </div>
      </>
    );
  }
);
