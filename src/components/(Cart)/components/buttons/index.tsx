import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import {
  addToCart,
  decreaseCartItemQuantity,
  removeCartItem,
} from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { DouveryHeart } from '~/components/icons/heart';
export const ButtonCartIndex = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
 
  const iconSum = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
        fill="#ffff"
      />
      <path
        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
        fill="#ffff"
      />
    </svg>
  );
  const iconMenus = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
        fill="#ffff"
      />
    </svg>
  );
  return (
 
      <div class="buttos-cart">
        <div class="buttos-cart-carsh">
          <button
            onClick$={() => {
              removeCartItem({ dui: product.dui });
              nav('/v/cart');
            }}
          >
            Eliminar
          </button>
        </div>{' '}
        <div class="ctr-opa">|</div>
        <div class="buttons-ca">
          <button
            onClick$={() => {
              decreaseCartItemQuantity({
                dui: product.dui,
                decreaseAmount: 1,
              });
              nav('/v/cart');
            }}
          >
            {iconMenus}
          </button>
          <div class="quantity">
            <p>{product.quantity}</p>
          </div>
          <button
            onClick$={() => {
              addToCart({ dui: product.dui, quantity: 1 });
              nav('/v/cart');
            }}
          >
            {iconSum}
          </button>
        </div>
        <div class="ctr-opa">|</div>
        <div class="button-shared">
          <button
            onClick$={() => {
              removeCartItem({ dui: product.dui });
              nav('/v/cart');
            }}
          >
            Compartir
          </button>
        </div>{' '}
        <div class="ctr-opa">|</div>
        <div class="button-favorite">
          <DouveryHeart size="15px" />
          <button
            onClick$={() => {
              removeCartItem({ dui: product.dui });
              nav('/v/cart');
            }}
          >
            Favorito
          </button>
        </div>
      </div>
   
  );
});
