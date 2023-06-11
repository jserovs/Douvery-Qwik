import {
  $,
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './css/container-hrs-butros.css?inline';
import { DouveryHeart } from '~/components/icons/heart';
import { DouveryInfo } from '~/components/icons/info';
import { ContainerPoputCategory } from './components/popupCategory';
import { useLocation } from '@builder.io/qwik-city';
import {
  addToFavoriteProducts,
  isFavorite,
  removeFromFavoriteProducts,
} from '~/services/cart/favorite-product';

import { DouveryCheckMark } from '~/components/icons/checkMark';
export const ExtraButtonContainer = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const isFav = useStore({ setFav: false });
  useVisibleTask$(() => {
    isFav.setFav = isFavorite({ dui: props.dui });
  });
  const handleClick = $(() => {
    if (isFav.setFav) {
      removeFromFavoriteProducts({ dui: props.dui });
      isFav.setFav = false;
    } else {
      addToFavoriteProducts({ dui: props.dui });
      isFav.setFav = true;
    }
  });
  return (
    <div class="crtr-brst-csr">
      <div class="q-r-pred etqsitms">
        <button onClick$={handleClick} class={isFav.setFav ? 'favorite' : ''}>
          {isFav.setFav ? (
            <div class="check-s">
              {' '}
              <DouveryCheckMark size="15px" />
            </div>
          ) : (
            <>
              {' '}
              <DouveryHeart size="15px" class={isFav ? 'icon-favorite' : ''} />
            </>
          )}{' '}
          Favorito
        </button>

        <div class="se-pr">|</div>
        <a href="/">
          <DouveryInfo size="15px" /> Suggest information
        </a>
        <div class="se-pr">|</div>
        <a href={loc.url.pathname + '#REVIEWS'}>
          {props.ratings.length == 0 ? <>Sin</> : props.ratings.length}{' '}
          calificaciones
        </a>
        <div class="se-pr">|</div>
        <a href="/">Sin preguntas respondidas</a>
      </div>
      <div class="opcs">
        {' '}
        <p class="ps-sr1">Puede ver algunas</p>
        <ContainerPoputCategory props={props} title="Opciones" />
      </div>
    </div>
  );
});
