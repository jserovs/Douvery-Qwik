import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-1.css?inline';
import { ContainerCardProduct2 } from '~/components/cards/product/product-card-2/product-card-2';
import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
export const Carousel1 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const currentIndex = useStore({ setCurrentIndex: 0 });

  return (
    <div class="carousel">
      <button
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
          transform: `translateX(-${currentIndex.setCurrentIndex * 25}%)`,
        }}
      >
        {product.map((pro: any, index: any) => {
          return (
            <div key={index}>
              <ContainerCardProduct2 product={pro} />
            </div>
          );
        })}
      </div>
      <button
        class="carousel__btn carousel__btn--next"
        onClick$={() =>
          currentIndex.setCurrentIndex === 3
            ? ''
            : currentIndex.setCurrentIndex++
        }
        disabled={currentIndex.setCurrentIndex == 3}
      >
        <DouveryRight3 size="30" />
      </button>
    </div>
  );
});
