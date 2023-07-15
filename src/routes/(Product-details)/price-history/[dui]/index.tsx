import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import { Header_info_button } from '~/components/use/header/header_info_button/header_info_button';
import { routeLoader$ } from '@builder.io/qwik-city';
import { fetchProductPriceHistory } from '~/services/product/product__price-history';
import { CardProductSelect1 } from '~/components/cards/price-history/product-select-card/product-select-card';
import { UsePrice } from '~/components/use/price/price';
import { formatDateWithMinutes } from '~/services/fuction';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';

export const useProductInfo = routeLoader$(async (requestEvent) => {
  const dui = requestEvent.params.dui;
  const product = await fetchProductPriceHistory(dui);

  return product;
});
export default component$(() => {
  useStylesScoped$(styles);

  const productData = useProductInfo();
  console.log(productData.value);

  return (
    <div class="container__all">
      <Header_info_button title="Product price history" />
      <div class="price-history">
        <div class="price-history">
          {productData.value.priceHistory.map(
            (item: any, index: any, array: any) => {
              let priceChangeClass = '';
              let PriceChangeIcon = null;
              let PriceChangeText = '';
              let percentChange = '';

              if (index !== 0) {
                const difference = item.price - array[index - 1].price;
                percentChange = (
                  (difference / array[index - 1].price) *
                  100
                ).toFixed(2);

                if (difference > 0) {
                  priceChangeClass = 'price-increase';
                  PriceChangeIcon = <DouveryArrowUp />;
                  PriceChangeText = `Increased by ${percentChange}%`;
                } else if (difference < 0) {
                  priceChangeClass = 'price-decrease';
                  PriceChangeIcon = <DouveryArrowDown />;
                  PriceChangeText = `Decreased by ${Math.abs(
                    percentChange as any
                  )}%`;
                }
              }

              return (
                <div key={index} class="price-history-item">
                  <p class="price-history-date">
                    {formatDateWithMinutes(item.date)}
                  </p>
                  <p class={`price-history-price ${priceChangeClass}`}>
                    {PriceChangeIcon}
                    {PriceChangeText && (
                      <span class="price-change-text">{PriceChangeText}</span>
                    )}
                    <UsePrice price={item.price} />
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
      <CardProductSelect1 product={productData.value} />
    </div>
  );
});
