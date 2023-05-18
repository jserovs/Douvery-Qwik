import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import CarBanner from '~/components/carBanner/carBanner';

import styles from './index.css?inline';
// import Carousel from '~/components/carousel/carousel';
import CarouselAll from '~/components/carousel-all/carousel-all';
import { Promotion_CarouselAllInterest } from '~/components/(Promotions)/carousel/carousel-all-interest/carousel-all-interest';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="cotent">
        <div class="c-c-v">
          <CarBanner />
          <div class="con-gnl ">
            <div class="con-par-sld">
              <CarouselAll />
            </div>
          </div>
        </div>
        <div class="container-carousel-interes">
          <div class="title-show">
            <h2>Explora algunos productos</h2>
            <div class="show-more">
              {' '}
              <a href="dsaf/">Ver mas</a>
            </div>
          </div>
          <Promotion_CarouselAllInterest styleNumber={6} />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Douvery',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
