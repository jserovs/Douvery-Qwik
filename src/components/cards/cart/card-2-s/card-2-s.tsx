import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-2-s.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';

export const Card2SCART = component$(({ product }: any) => {
  useStylesScoped$(styles);
 
  return (
    <div class="container-all">
      <div class="card">
        <img src={product.images} alt="Product Image" class="product-image" />
        <div class="product-info">
          <a href={`/v//${product.dui}`}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>{' '}
          
        </div>
      </div>
    </div>
  );
});
