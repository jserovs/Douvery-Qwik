import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-2.css?inline';
import { ContainerCardProduct2 } from '~/components/cards/product/product-card-2/product-card-2';
import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import { ContainerCardProduct3 } from '~/components/cards/product/product-card-3/product-card-3';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';
import { ContainerCardProduct4 } from '~/components/cards/product/product-card-4/product-card-4';
import { ContainerCardProduct5 } from '~/components/cards/product/product-card-5/product-card-5';
import { ContainerCardProduct6 } from '~/components/cards/product/product-card-6/product-card-6';
import { ContainerCardProduct7 } from '~/components/cards/product/product-card-7/product-card-7';
import { ContainerCardProduct8 } from '~/components/cards/product/product-card-8/product-card-8';
import { ContainerCardProduct9 } from '~/components/cards/product/product-card-9/product-card-9';
import { ContainerCardProduct10 } from '~/components/cards/product/product-card-10/product-card-10';
import { ContainerCardProduct11 } from '~/components/cards/product/product-card-11/product-card-11';
export const Carousel2 = component$(({ product, styleCard }: any) => {
  useStylesScoped$(styles);
  const currentIndex = useStore({ setCurrentIndex: 0 });

  return (
    <div class="carousel">
      <button
        aria-label="btn carousel__btn--prev"
        class="carousel__btn carousel__btn--prev"
        onClick$={() =>
          currentIndex.setCurrentIndex === 0
            ? ''
            : currentIndex.setCurrentIndex--
        }
        disabled={currentIndex.setCurrentIndex == 0}
      >
        <DouveryLeft3 size="30" />
      </button>
      <div
        class="carousel__content"
        style={{
          transform: `translateX(-${currentIndex.setCurrentIndex * 750}px)`,
        }}
      >
        {product.map((pro: any, index: any) => {
          return (
            <div class="carousel_item" key={index}>
              {styleCard == 1 ? <ContainerCardProduct1 product={pro} /> : ''}
              {styleCard == 2 ? <ContainerCardProduct2 product={pro} /> : ''}
              {styleCard == 3 ? <ContainerCardProduct3 product={pro} /> : ''}
              {styleCard == 4 ? <ContainerCardProduct4 product={pro} /> : ''}
              {styleCard == 5 ? <ContainerCardProduct5 product={pro} /> : ''}
              {styleCard == 6 ? <ContainerCardProduct6 product={pro} /> : ''}
              {styleCard == 7 ? <ContainerCardProduct7 product={pro} /> : ''}
              {styleCard == 8 ? <ContainerCardProduct8 product={pro} /> : ''}
              {styleCard == 9 ? <ContainerCardProduct9 product={pro} /> : ''}
              {styleCard == 10 ? <ContainerCardProduct10 product={pro} /> : ''}
              {styleCard == 11 ? <ContainerCardProduct11 product={pro} /> : ''}
            </div>
          );
        })}
      </div>
      <button
        aria-label="btn carousel__btn--next"
        class="carousel__btn carousel__btn--next"
        onClick$={() =>
          currentIndex.setCurrentIndex * 750 === 5250
            ? ''
            : currentIndex.setCurrentIndex++
        }
        disabled={currentIndex.setCurrentIndex * 750 === 5250}
      >
        <DouveryRight3 size="30" />
      </button>
    </div>
  );
});
