import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header-cart.css?inline';
import { removeAllCartItems } from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';
import { PoputOptionsCart } from '../poput-options/poput-options';
export const HeaderCart = component$(({ stateProduct }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const user = useGetCurrentUser().value;
  return (
    <>
      <div class="content">
        <div class="crrts-title">
          <div class="ofrs">
            <p>
              Bienvenido{' '}
              {user ? (
                <>
                  <strong class="name-user">{user.name}</strong>
                </>
              ) : (
                ''
              )}{' '}
              a tu carrito de compras
            </p>
          </div>
        </div>
        <div class="container-option-mobiles">
          Puedes ver algunas
          <PoputOptionsCart title="Opciones" />
        </div>
        <div class="container-options-cart">
          <div class="button-shared">
            <button onClick$={() => {}}>Compartir carrito de compra</button>
          </div>{' '}
          <div class="ctr-opa">|</div>
          <div class="button-favorite">
            <button onClick$={() => {}}>Ultimos productos visto</button>
          </div>
          <div class="ctr-opa">|</div>
          {stateProduct.length > 0 ? (
            <>
              {' '}
              <div class="button-shared">
                <button
                  onClick$={() => {
                    removeAllCartItems();
                    nav('/v/cart');
                  }}
                >
                  Eliminar todos los productos
                </button>
              </div>{' '}
            </>
          ) : (
            ''
          )}{' '}
        </div>
      </div>
    </>
  );
});
