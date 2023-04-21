import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './orders-1.css?inline';
import type { UserOrders } from '~/utils/types';
import { ProgressLine } from '~/components/status/line/line';
import { UsePrice } from '~/components/use/price/price';
import { TextCL } from '~/components/use/textCL/textCL';
export const CardOrdersC1 = component$(({ order }: { order: UserOrders }) => {
  useStylesScoped$(styles);
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
            <p>16 may 2023</p>
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
          {order.uniqueProductImages.slice(0, 3).map((image) => (
            <img key={image} src={image} alt="Product" />
          ))}
        </div>
      </div>
    </div>
  );
});
