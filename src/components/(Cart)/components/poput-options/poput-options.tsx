import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './poput-options.css?inline';
import { DouveryCategory } from '~/components/icons/category';
import { removeAllCartItems } from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { DouveryExportShared } from '~/components/icons/export-shared';
import { DouveryTrash } from '~/components/icons/trash';
import { DouveryMouseSquare } from '~/components/icons/mouse-square';
export const PoputOptionsCart = component$(({ title }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const nav = useNavigate();
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
          <p> {title}</p>{' '}
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="list-container">
              <div class="tolst-tip"></div>
              <ul>
                <li class="list-item">
                  <div class="item-title">
                    <DouveryExportShared size="15px" /> Compartir carrito de
                    compra
                  </div>
                </li>{' '}
                <li class="list-item">
                  <div class="item-title">
                    <DouveryMouseSquare size="18px" /> Ultimos productos visto
                  </div>
                </li>
                <li class="list-item">
                  <div class="item-title">
                    {' '}
                    <DouveryTrash size="18px" />
                    <button
                      onClick$={() => {
                        removeAllCartItems();
                        nav('/v/cart');
                      }}
                    >
                      Eliminar todos los productos
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
});
