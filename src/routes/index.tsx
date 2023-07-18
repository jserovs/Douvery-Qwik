import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

import styles from './index.css?inline';
// import Carousel from '~/components/carousel/carousel';

import AllCategoryStoresId1 from '~/components/cards/category/all-category-stores-id/all-category-stores-id-1';
import { OutstandingProductFlex1 } from '~/components/(Promotions)/Outstanding/outstanding-product-flex/outstanding-product-flex-1';
import { Promotion_CarouselInterestViews } from '~/components/(Promotions)/carousel/carousel-inters/carousel-interest-view';

import { PromotionRecomend_Carousel_LastView } from '~/components/(Promotions)/carousel/carousel-recomend-last-view-product/carousel-recomend-last-view-product';
import { getLastItemViewedDui } from '~/services/viewed/viewed';
import ContainerCatogorieInit from '~/components/carousel-all/container-catogorie-init';

import { Promotion_Carousel__PopularProductsAll } from '~/components/(Promotions)/carousel/carousel-pupular-products-all/carousel-pupular-products-all';
import { fuctionRef } from '~/fuctions/fuctionRef';
import { BannerCarouselHome } from '~/components/carBanner/carBanner';
import { PromotionRecomend_Carousel_5LastView } from '~/components/(Promotions)/carousel/carousel-recomend-5last-view-product/carousel-recomend-5last-view-product ';
import { useGetCurrentUser } from './layout';
import { Title__showmore1 } from '~/components/use/title__showmore/title__showmore1/title__showmore1';

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

  const user = useGetCurrentUser().value;

  function ref(index: Number) {
    const fuction = fuctionRef(
      'center/' + 'center_page/' + 'center_index_page=' + index
    );
    return fuction;
  }
  return (
    <div class="container-all">
      <div class="cotent">
        <div class="c-c-v">
          <BannerCarouselHome ref={ref(0)} />
          <div class="con-gnl ">
            <div class="con-par-sld">
              <ContainerCatogorieInit ref={ref(1)} />
            </div>
          </div>
        </div>

        <div class="container-carousel-interes">
          <div class="title-show">
            <h2>Explora productos populares</h2>
            <div class="show-more">
              {' '}
              <a href="dsaf/">Ver mas</a>
            </div>
          </div>
          <Promotion_Carousel__PopularProductsAll
            ref={ref(2)}
            styleNumber={11}
          />
        </div>
        <div class="container-card-store-categorie">
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

          <AllCategoryStoresId1 />
        </div>

        <div class="container-carousel-interes">
          <div class="title-show">
            <h2>Explora algunos productos</h2>
            <div class="show-more">
              {' '}
              <a href="dsaf/">Ver mas</a>
            </div>
          </div>
          <Promotion_CarouselInterestViews ref={ref(3)} styleNumber={11} />
        </div>

        <br />
        <div class="container-aoutandingproducts">
          <Title__showmore1 title="Explora lo mejor de Douvery" />
          <div class="border_1"></div>
          <OutstandingProductFlex1 />
        </div>

        {lastViewDui.value && (
          <>
            {' '}
            <br />
            <div class="container-carousel-interes">
              <div class="title-show">
                <h2>Basado en el último producto que viste</h2>
                <div class="show-more">
                  {' '}
                  <a href="dsaf/">Ver mas</a>
                </div>
              </div>
              <PromotionRecomend_Carousel_LastView
                ref={ref(5)}
                styleNumber={11}
              />
            </div>
            <br />
          </>
        )}
        {user?.id && (
          <div class="container-carousel-interes">
            <div class="separator_custom" />
            <PromotionRecomend_Carousel_5LastView
              ref={ref(4)}
              styleNumber={11}
            />
            <div class="separator_custom" />
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title:
    'Douvery - Enjoy, shop and share your happiness with us, welcome to Douvery.',
  meta: [
    {
      name: 'description',
      content:
        'Welcome to Douvery, your ultimate platform to enjoy, shop, and share your happiness. Browse through our wide selection of products, find items you love, and share your joy with us. Enjoy shopping at Douvery!',
    },
  ],
};
