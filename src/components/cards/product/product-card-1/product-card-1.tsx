import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';

export const ContainerCardProduct1 = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="crtr-prds-card">
      <div class="crtr-prds-card-img">
        <img
          src="https://res.cloudinary.com/douvery/image/upload/v1666290931/Under%20Armour%20Charged%20Pursuit%203%20-%20Tenis%20de%20correr%20para%20hombre/f5hvekoyhofm1f2o4j3u.webp"
          alt=""
        />
        <et-sr1>Envio totalmente gratis</et-sr1>
      </div>
    </div>
  );
});
