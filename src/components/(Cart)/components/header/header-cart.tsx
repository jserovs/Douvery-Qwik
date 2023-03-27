import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header-cart.css?inline';
import { removeAllCartItems } from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';
import { PoputOptionsCart } from '../poput-options/poput-options';
import { TextCL } from '~/components/use/textCL/textCL';
import { ButtonFollow } from '../buttons/button-follow/button-follow';
import { UsePrice } from '~/components/use/price/price';
export const HeaderCart = component$(({ stateProduct, subTotal }: any) => {
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
                  <strong class="name-user">
                    <TextCL text={user.name} />
                  </strong>
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
        <div class="container-movil">
          <ul class="container-lista">
            <li>
              Subtotal:{' '}
              <span id="subtotal" class="container-value">
                <UsePrice price={subTotal.setsubTotal} />
              </span>
            </li>
          </ul>
          <div class="container-button-follow">
            <ButtonFollow />
          </div>
        </div>
      </div>
    </>
  );
});
