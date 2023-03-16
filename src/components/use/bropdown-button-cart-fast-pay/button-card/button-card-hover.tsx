import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-card-hover.css?inline';
import { DouveryReport } from '~/components/icons/report';
import { DouveryInfo } from '~/components/icons/info';
import { DouveryHeart } from '~/components/icons/heart';
export const ButtonCardHover = component$(({ product }: any) => {
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
          <DouveryReport />
        </button>
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="list-container">
              <div class="tolst-tip"></div>
              <div class="container-ttle">
                <h3>Selecionado:</h3>
                <p>{product.name}</p>
              </div>
              <ul>
                {' '}
                <li class="list-item">
                  <button class="buttonCart">Agregar al carrito</button>
                </li>
                <li class="list-item">
                  <button class="buttonPay"> Pagar rapido</button>
                </li>
                <li class="list-item">
                  <button class="buttonWishlist">
                    <DouveryHeart size="15px" /> Lista de deseos
                  </button>
                </li>
              </ul>
              <p class="item-subtitle">
                <DouveryInfo size="15px" /> Reportar producto
              </p>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
});
