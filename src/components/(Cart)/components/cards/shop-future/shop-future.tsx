import { component$, useStylesScoped$,} from '@builder.io/qwik';
import styles from './shop-future.css?inline';
import {  useLocation, useNavigate,  } from '@builder.io/qwik-city';

import { useGetCurrentUser } from '~/routes/layout';
import { CardShopFutureProduct } from './components/product';






export const CardShopFuture = component$(
  () => {
    useStylesScoped$(styles);
    const nav = useNavigate()
    const {url}=useLocation()
     const user = useGetCurrentUser().value;

   
    return (
      <>
        <div class="cart-future-shop">
          <h3 class="container-titulo">Lista de compras futuras
</h3>
{user ? <><CardShopFutureProduct/></> : <> 
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
