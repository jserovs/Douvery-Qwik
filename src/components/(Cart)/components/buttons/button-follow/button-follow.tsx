import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryArrowRigth1 } from '~/components/icons/arrow-right-1';
import styles from './button-follow.css?inline';
export const ButtonFollow = component$(() => {
  useStylesScoped$(styles);
  return (
    <div>
      <button id="siguiente" class="container-boton">
        <div class="text-button">Proceder a pagar</div>
        <div class="animation-ir">
          Ir <DouveryArrowRigth1 size="16px" />
        </div>
      </button>
    </div>
  );
});
