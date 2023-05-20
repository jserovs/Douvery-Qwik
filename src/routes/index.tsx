import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import CarBanner from '~/components/carBanner/carBanner';

import styles from './index.css?inline';
// import Carousel from '~/components/carousel/carousel';
import CarouselAll from '~/components/carousel-all/carousel-all';
import { Promotion_CarouselAllInterest } from '~/components/(Promotions)/carousel/carousel-all-interest/carousel-all-interest';

import AllCategoryStoresId1 from '~/components/cards/category/all-category-stores-id/all-category-stores-id-1';
import { OutstandingProductFlex1 } from '~/components/(Promotions)/Outstanding/outstanding-product-flex/outstanding-product-flex-1';
import { Promotion_CarouselInterestViews } from '~/components/(Promotions)/carousel/carousel-inters/carousel-interest-view';
import { Alert1 } from '~/components/cards/alerts/alert/alert-1/alert-1';
import { PromotionRecomend_Carousel_LastView } from '~/components/(Promotions)/carousel/carousel-recomend-last-view-product/carousel-recomend-last-view-product';
import { getLastItemViewedDui } from '~/services/viewed/viewed';

export default component$(() => {
  useStylesScoped$(styles);

  const lastViewDui = useSignal('');

  useVisibleTask$(async () => {
    const controller = new AbortController();
    const dui = getLastItemViewedDui();
    lastViewDui.value = dui;

    return () => {
      controller.abort();
    };
  });
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
          <Promotion_CarouselAllInterest styleNumber={11} />
        </div>
        <div class="container-aoutandingproducts">
          <div class="title-show">
            <h2>Lo Mejor de Douvery</h2>
            <div class="show-more">
              {' '}
              <a href="dsaf/">Ver mas</a>
            </div>
          </div>
          <OutstandingProductFlex1 />
        </div>
        <div class="container-carousel-interes">
          <div class="title-show">
            <h2>Explora algunos productos</h2>
            <div class="show-more">
              {' '}
              <a href="dsaf/">Ver mas</a>
            </div>
          </div>
          <Promotion_CarouselInterestViews styleNumber={6} />
        </div>
        <Alert1
          text="Nos importa lo que piensas en Douvery. Agradecemos tu opinión después de tu compra"
          ttlHrf="Saber mas"
          hrf="fhr/aopad"
        />
        <br />
        <div class="container-card-store-categorie">
          <br />
          <div class="title-show">
            <h2>
              {' '}
              Explora algunas de las categorías disponibles en la tienda de{' '}
              Douvery.
            </h2>
            <div class="show-more">
              {' '}
              <a href="dsaf/">Ver mas</a>
            </div>
          </div>
          <br />

          <AllCategoryStoresId1
            storeId="3465460B-51D47297-87C20FED"
            store="Douvery"
          />
        </div>

        {lastViewDui.value && (
          <div class="container-carousel-interes">
            <div class="title-show">
              <h2>Basado en el último producto que viste</h2>
              <div class="show-more">
                {' '}
                <a href="dsaf/">Ver mas</a>
              </div>
            </div>
            <PromotionRecomend_Carousel_LastView styleNumber={11} />
          </div>
        )}
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
