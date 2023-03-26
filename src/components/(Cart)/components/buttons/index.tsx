import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import {
  addToCart,
  decreaseCartItemQuantity,
  removeCartItem,
} from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { DouveryHeart } from '~/components/icons/heart';

import { DropdownShared } from '../dropdowm/dropdown';
import { addToFavoriteProducts } from '~/services/cart/favorite-product';
import { ModalFuturePurchase } from '../cards/shop-future/modal/modal-purchase';
import { useGetCurrentUser } from '~/routes/layout';
import { DouveryIconSum } from '~/components/icons/sum';
import { DouveryIconRes } from '~/components/icons/res';

export const ButtonCartIndex = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const user = useGetCurrentUser().value;

  return (
    <div class="buttos-cart">
      {user ? (
        <>
          {' '}
          <div class="no-mobiles">
            <div class="button-store-future">
              <ModalFuturePurchase product={product} />
            </div>
            <div class="ctr-opa">|</div>
          </div>
        </>
      ) : (
        <> </>
      )}
      <div class="button-favorite">
        <DouveryHeart size="15px" />
        <button
          onClick$={() => {
            removeCartItem({ dui: product.dui });
            addToFavoriteProducts({ dui: product.dui });
            nav('/v/cart');
          }}
        >
          Favorito
        </button>
      </div>
      <div class="ctr-opa">|</div>
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
          <DouveryIconRes />
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
          <DouveryIconSum />
        </button>
      </div>
      <div class="ctr-opa">|</div>
      <div class="button-shared">
        <DropdownShared product={product} />
      </div>{' '}
    </div>
  );
});
