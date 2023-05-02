import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-7.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';

import { AddCart } from '~/components/(Product-details)/components/container-button-details';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { ModalCartInfo } from '~/components/modal/modal-cart/modal-cart';

export const ContainerCardProduct7 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const isLoader = useSignal(false);

  return (
    <div class="product-card">
      <a href={`/v/${product.slug}/${product.dui}`}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
      <a href={`/v/${product.slug}/${product.dui}`}>
        <h2 class="product-brand">
          <TextCL text={product.marca} />{' '}
        </h2>
      </a>
      <a href={`/v/${product.slug}/${product.dui}`}>
        <h2 class="product-name">
          {' '}
          <TextCL text={product.name} />
        </h2>
      </a>
      {isLoader.value == true && <ModalCartInfo />}
      <div class="container-buttons">
        <button
          class="button-add"
          style={{
            backgroundColor: '#111827',
            color: '#fff',
          }}
          onClick$={() => AddCart({ product, quantity: 1, isLoader })}
        >
          {isLoader.value == true && (
            <div class="check">
              {' '}
              <DouveryCheckMark size="15px" />
            </div>
          )}{' '}
          Add to cart
        </button>
        <button
          class="button-quick-view"
          style={{
            backgroundColor: '#f8fafc',
            color: '#444',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            border: '1px solid #444',
          }}
        >
          Quick view
        </button>
      </div>
    </div>
  );
});
