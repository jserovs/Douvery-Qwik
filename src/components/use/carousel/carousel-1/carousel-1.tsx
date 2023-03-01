import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-1.css?inline';
import { ContainerCardProduct2 } from '~/components/cards/product/product-card-2/product-card-2';
import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import { ContainerCardProduct3 } from '~/components/cards/product/product-card-3/product-card-3';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';
import { ContainerCardProduct4 } from '~/components/cards/product/product-card-4/product-card-4';
import { ContainerCardProduct5 } from '~/components/cards/product/product-card-5/product-card-5';
export const Carousel1 = component$(({ product, styleCard }: any) => {
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
