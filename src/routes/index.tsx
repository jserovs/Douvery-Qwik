import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import CarBanner from '~/components/carBanner/carBanner';

import styles from './index.css?inline';
// import Carousel from '~/components/carousel/carousel';
import CarouselAll from '~/components/carousel-all/carousel-all';

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
