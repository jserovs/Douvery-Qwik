import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';

import styles from './index.css?inline';

// import { fetchProduct } from '~/services/fechProduct';

// import { cleanUpParams } from '~/utils/cleurs';
// import { execute } from '~/utils/api';
// import { getProductQuery } from '~/services/query';
import { fetchProduct } from '~/services/fechProduct';

import type { DocumentHead } from '@builder.io/qwik-city';

import { routeLoader$, useLocation } from '@builder.io/qwik-city';

import { View2 } from '~/components/(Product-details)/components/sessions/VIEW 2/view2';
import { View1 } from '~/components/(Product-details)/components/sessions/VIEW 1/view1';
import { View4 } from '~/components/(Product-details)/components/sessions/VIEW 4/view4';

import { View5 } from '~/components/(Product-details)/components/sessions/VIEW 5/view5';
import { addToViewedProducts } from '~/services/viewed/viewed';
import { sendUserTimestamp } from '~/services/userTimestamp/userTimestamp';
import { useGetCurrentUser } from '~/routes/layout';
import { UseProductDetailsLink } from '~/services/fuction';
import { View3 } from '~/components/(Product-details)/components/sessions/VIEW 3/view3';

export const useProductInfo = routeLoader$(async (requestEvent) => {
  const dui = requestEvent.params.dui;
  const product = await fetchProduct(dui);

  return product;
});

export default component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();
  const user = useGetCurrentUser().value;
  const productData = useProductInfo();

  const descriptionEdit = useSignal(
    `${productData.value.productDetails.pd_detailsDescriptionBox}`
  );

  useVisibleTask$(() => {
    addToViewedProducts({
      dui: location.params.dui,
      ref: location.url.searchParams.get('ref') as any,
    });
  });
  useVisibleTask$(() => {
    sendUserTimestamp({
      productDui: location.params.dui,
      userId: user?.id as any,
    });
  });

  return (
    <>
      <div>
        <View1 props={productData.value} />
        <View2 product={productData.value} />
        {descriptionEdit.value === 'undefined' ? (
          ''
        ) : (
          <div class="description__product__details">
            <div
              class="content_description_pers"
              dangerouslySetInnerHTML={descriptionEdit.value}
            />
          </div>
        )}

        <View3 product={productData.value} />
        <View4 product={productData.value} />
        <div class="container-views">
          <View5 product={productData.value} />
        </div>
      </div>
    </>
  );
});
export const head: DocumentHead = ({ resolveValue, params }) => {
  const product = resolveValue(useProductInfo);
  const urkProduct = UseProductDetailsLink(product, '');
  const title_product =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);
  return {
    title: `${title_product} - Douvery`,
    meta: [
      {
        name: 'description',
        content: product.description,
      },
      {
        name: 'dui',
        content: params.dui,
      },
      {
        property: 'og:image',
        content: product.images[0],
      },
      {
        name: 'keywords',
        content: product.keywords,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: title_product,
          image: product.images[0],
          description: product.description,
          sku: product.dui,
          mpn: product.dc,
          brand: {
            '@type': 'Brand',
            name: product.marca,
          },
          offers: {
            '@type': 'Offer',
            url: urkProduct,
            priceCurrency: 'USD',
            price: product.price,
            availability: product.quantity > 0 ? 'InStock' : 'OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'Douvery',
            },
          },
        },
      },
    ],
  };
};
