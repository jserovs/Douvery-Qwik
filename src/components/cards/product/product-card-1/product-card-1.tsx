import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';
import { DouveryArrowRigth1 } from '~/components/icons/arrow-right-1';

export const ContainerCardProduct1 = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="crtr-prds-card">
      <div class="crt-img">
        <img
          src="https://res.cloudinary.com/douvery/image/upload/v1666290931/Under%20Armour%20Charged%20Pursuit%203%20-%20Tenis%20de%20correr%20para%20hombre/f5hvekoyhofm1f2o4j3u.webp"
          alt=""
        />
      </div>
      <div class="crt-title">
        <hs-sr1>
          Under Armour Charged Pursuit 3 - Tenis de correr para hombre
          <div class="dsr">
            {' '}
            <hs-sr1>Under Armour</hs-sr1>
          </div>
        </hs-sr1>
      </div>
      <div class="crt-price">
        <hs-sr1 class="pr-n-ta">$ 2,500.00</hs-sr1>
        <p class="pr-ta">$ 2,999.00</p>
      </div>
      <div class="fllr-res">
        {' '}
        <f-srt1>Envio Gratis</f-srt1>
      </div>

      <div class="sr-of">
        {' '}
        <p-sr1>Sponsor</p-sr1>
        <div class="ssr-f">
          {' '}
          <p-sr1> Ver ofertas</p-sr1>
          <DouveryArrowRigth1 size="20" />
        </div>
      </div>
    </div>
  );
});
