import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-1.css?inline';
import { ContainerCardProduct2 } from '~/components/cards/product/product-card-2/product-card-2';
export const Carousel1 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div
      class="carousel"
      data-flickity='{ "groupCells": true, "pageDots": false, "imagesLoaded":true }'
    >
      {product.map((pro: any, index: any) => {
        return (
          <div key={index} class="ctr-prd-cr">
            <ContainerCardProduct2 product={pro} />
          </div>
        );
      })}
    </div>
  );
});
