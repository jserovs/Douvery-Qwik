import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-desc-short.css?inline';
export const containerDescShort = component$(() => {
  useStylesScoped$(sryles);
  return (
    <div class="super-container-title-brand-product mobiles-title-brand"></div>
  );
});
