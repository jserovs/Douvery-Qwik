import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import CarBanner from '~/components/carBanner/carBanner';

import styles from './index.css?inline';

import CarouselNew from '~/components/carousel-new/carousel-new';
import ContainerVert from '~/components/container-vert/container-vert';
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
              <CarouselNew />
            </div>
            <ContainerVert />
          </div>
        </div>

        <div class="container list-cont">{/* <Carousel /> */}</div>
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
