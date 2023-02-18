import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './view3.css?inline';
export const View3 = component$(({ product }: any) => {
  useStylesScoped$(style);
  product;
  return (
    <div class="ctnr-view-3">
      {' '}
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Detalles del producto</hs-sr3>
          <div class="srs-v">
            <a class="ps-sr1">Saber mas</a>
          </div>
        </div>
        <p class="ps-sr1">Detalles interesantes del producto</p>
        <div class="srs-md">
          <a class="ps-sr1">Saber mas</a>
        </div>
      </div>
      <div class="content">
        <iframe></iframe>
      </div>
    </div>
  );
});
