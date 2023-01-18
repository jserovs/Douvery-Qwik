import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-header-name-brands-product.css?inline';
export const ContainerHeaderNameBrandProduct = component$(({ props }: any) => {
  useStylesScoped$(sryles);
  return (
    <div class="super-container-title-brand-product mobiles-title-brand">
      <div class="container-brand-product">
        <a href="/" aria-label={props.marca}>
          {props.marca}
        </a>
      </div>
      <size-w class="size-w-10" />
      <div class="container-title-product">
        {' '}
        <h5>{props.name}</h5>
      </div>
    </div>
  );
});
