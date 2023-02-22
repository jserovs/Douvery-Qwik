import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-1.css?inline';
import { ContainerCardProduct2 } from '~/components/cards/product/product-card-2/product-card-2';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
export const Carousel1 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const imagenActual = useStore({ setImagenActual: 0 });
  const limit = 5;
  return (
    <div class="carousel">
      <button
        class="carousel-button-left"
        onClick$={() =>
          imagenActual.setImagenActual && imagenActual.setImagenActual--
        }
        disabled={imagenActual.setImagenActual === 0}
      >
        <DouveryLeft3 size="30" />
      </button>
      <div class="carousel-items">
        {' '}
        {product
          .slice(
            imagenActual.setImagenActual,
            imagenActual.setImagenActual + limit
          )
          .map((img: any, index: any) => {
            return (
              <div
                key={index}
                class={`carousel-item ${
                  index === limit && index + limit < product.length
                    ? 'slideout'
                    : index === 0 && index > 0
                    ? 'slidein'
                    : ''
                }`}
              >
                <ContainerCardProduct2 product={img} />
              </div>
            );
          })}
      </div>
      <button
        class="carousel-button-right"
        onClick$={() =>
          imagenActual.setImagenActual + limit < product.length
            ? imagenActual.setImagenActual++
            : ''
        }
        disabled={imagenActual.setImagenActual + limit >= product.length}
      >
        <DouveryRight3 size="30" />
      </button>
    </div>
  );
});
