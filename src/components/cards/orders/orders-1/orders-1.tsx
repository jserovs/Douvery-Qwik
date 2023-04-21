import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './orders-1.css?inline';
import type { UserOrders } from '~/utils/types';
import { ProgressLine } from '~/components/status/line/line';
import { UsePrice } from '~/components/use/price/price';
import { TextCL } from '~/components/use/textCL/textCL';
export const CardOrdersC1 = component$(({ order }: { order: UserOrders }) => {
  useStylesScoped$(styles);
  function formatDate(timestamp: any) {
    const months = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
  const showAll = useSignal(false);
  const toggleShowAll = $(() => {
    showAll.value = !showAll.value;
  });

  const imagesToShow = showAll.value
    ? order.uniqueProductImages
    : order.uniqueProductImages.slice(0, 4);

  return (
    <div class="container-all-card">
      <div class="order-info">
        <p>Order ID: &nbsp;&nbsp;{order.orderId}</p>
        <p>
          Total Amount:&nbsp;&nbsp; <UsePrice price={order.totalAmount} />
        </p>
        <p>Item Count:&nbsp;&nbsp; {order.itemCount}</p>
        <p>
          Payment Method:&nbsp;&nbsp; <TextCL text={order.paymentMethod} />
        </p>
      </div>
      <div class="order-status">
        <div class="container-progre">
          <div class="created-at">
            <p>{formatDate(order.orderedAt)}</p>
          </div>
          <div class="container-line-progress">
            <div class="line">
              <ProgressLine count={order.status} />
            </div>

            <div class="count-progress">
              <p>1 / 5</p>
            </div>
          </div>
        </div>
        <div class="title-status">
          <p>Confirmed & pay</p>
        </div>
        <div class="separator"></div>
        <div class="images-container">
          {imagesToShow.map((image) => (
            <img key={image} src={image} alt="Product" />
          ))}
        </div>
        {order.uniqueProductImages.length > 4 && (
          <button class="show-button" onClick$={toggleShowAll}>
            {showAll.value ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>
    </div>
  );
});
