import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-1.css?inline';
import { ContainerCardProduct2 } from '~/components/cards/product/product-card-2/product-card-2';
export const Carousel1 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="carousel">
      <div class="MagicScroll" data-options="items: [[200,1],[400,2],[600,2]]">
        {product.map((pro: any, index: any) => {
          return (
            <div key={index} class="ctr-prd-cr">
              <ContainerCardProduct2 product={pro} />
            </div>
          );
        })}
        ...
      </div>
    </div>
  );
});
