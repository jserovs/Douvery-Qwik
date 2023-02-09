import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-basic-feature.css?inline';

export const ContainerBasicFeacture = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="crtr-charac-bs">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Características básicas</hs-sr3>
        </div>

        <p-sr1>Lo esencial en pocas palabras</p-sr1>
      </div>
      <div>
        <ul>
          <li>
            <strong>Dui:</strong> {product.basicFeatures.dui}
          </li>
          <li>
            <strong>Tamaño:</strong> {product.basicFeatures.size}
          </li>
          <li>
            <strong>Peso:</strong> {product.basicFeatures.weight}
          </li>
          <li>
            <strong>Color:</strong> {product.basicFeatures.color}
          </li>
        </ul>
      </div>
    </div>
  );
});
