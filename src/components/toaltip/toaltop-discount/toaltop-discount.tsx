import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import style from './toaltop-discount.css?inline';
export const ToaltopDiscount = component$(({ discount }: any) => {
  const showTooltip = useStore({ setShowTooltip: true });
  useStylesScoped$(style);
  return (
    <>
      {showTooltip.setShowTooltip && (
        <div class="tooltip tooltip--appear">
          <div class="tolst-tip"></div>
          <span class="discount">{discount}% de descuento</span>
          <button
            class="close"
            onClick$={() =>
              (showTooltip.setShowTooltip = !showTooltip.setShowTooltip)
            }
          >
            x
          </button>
        </div>
      )}
    </>
  );
});
