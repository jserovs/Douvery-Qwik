import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-basic-feature.css?inline';

export const ContainerBasicFeacture = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="crtr-charac-bs">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Detalles basicos</hs-sr3>
        </div>

        <p-sr1>Lo esencial en pocas palabras</p-sr1>
      </div>
      <div>
        <ul>
          <li>
            <strong>Dui:</strong> {product.dui}
          </li>
          <li>
            <strong>Medidas:</strong> {product.basicFeatures.size}
          </li>
          <li>
            <strong>Peso:</strong> {product.basicFeatures.weight}
          </li>
          <li>
            <strong>Color:</strong> {product.basicFeatures.color}
          </li>
          <li>
            <strong>Vendedor:</strong>{' '}
            <div>
              <a-sr1-info>{product.marca}</a-sr1-info>{' '}
              <p-sr1>
                {' '}
                , Seller en douvery desde 2021{' '}
                {product.sponsored === true ? (
                  <>
                     <a-sr1-info> +50 Opiniones</a-sr1-info>
                  </>
                ) : (
                  <></>
                )}
                
              </p-sr1>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
});
