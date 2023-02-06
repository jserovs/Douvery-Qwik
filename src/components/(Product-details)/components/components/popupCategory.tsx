import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/popupCategory.css?inline';

import { DouveryCategory } from '~/components/icons/category';
import { DouveryHeart } from '~/components/icons/heart';
import { DouveryInfo } from '~/components/icons/info';
import { DouveryStars } from '~/components/icons/stars';
import { DouveryGlobalSearch } from '~/components/icons/global-search';

export const ContainerPoputCategory = component$(({ title, props }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });

  return (
    <div>
      {' '}
      {isOpen.setIsOpen && (
        <div
          class="shad-modal"
          onClick$={() => (isOpen.setIsOpen = false)}
        ></div>
      )}
      <div>
        <button
          class="trl-drs"
          onClick$={() => (isOpen.setIsOpen = !isOpen.setIsOpen)}
        >
          <DouveryCategory size="18" />
          <p class="ttle-draw"> {title}</p>{' '}
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="list-container">
              <div class="tolst-tip"></div>
              <ul>
                <li class="list-item">
                  <div class="item-title">
                    <DouveryHeart size="15px" />
                    Add to Wishlist
                  </div>
                </li>
                <li class="list-item">
                  <div class="item-title">
                    <DouveryInfo size="15px" /> Suggest information
                  </div>
                </li>
                <li class="list-item">
                  <div class="item-title">
                    <DouveryStars size="15px" />
                    {props.ratings.length == 0 ? (
                      <>Sin</>
                    ) : (
                      props.ratings.length
                    )}{' '}
                    calificaciones
                  </div>
                </li>
                <li class="list-item">
                  <div class="item-title">
                    {' '}
                    <DouveryGlobalSearch size="15px" />
                    Sin preguntas Respondidas
                  </div>
                </li>{' '}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
});
