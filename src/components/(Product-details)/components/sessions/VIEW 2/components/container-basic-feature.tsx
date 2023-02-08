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
            <strong>Dui</strong> {product.dui}
          </li>
          <li>
            <strong>Tamaño</strong> 15 x 20 x 25 cm
          </li>

          <li>
            <strong>Peso</strong> 2 kg
          </li>
          <li>
            <strong>Color</strong> Azul
          </li>
        </ul>
      </div>
    </div>
  );
});
