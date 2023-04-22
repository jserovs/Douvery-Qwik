import {
  component$,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './product-pay.css?inline';
import { Link, useLocation } from '@builder.io/qwik-city';
import { getDataProductCart } from '~/services/cart/cart';
import type { Product } from '~/utils/types';
import { Card1PRODUCTPAY } from '~/components/cards/buy/pay/card1/product-pay';
import { calculateCartDetails } from '~/services/fuction';

export interface Icar_product {
  productResults: Product[];
}

export const ProductPay = component$(
  ({
    car_product,
    totalAmount,
    shipping,
    taxAmount,
    subTotal,
    discount,
    subTotalNoDiscount,
  }: any) => {
    useStylesScoped$(styles);
    const url = useLocation();

    useVisibleTask$(async ({ track }) => {
      track(() => url.pathname);

      const controller = new AbortController();
      car_product.productResults = await getDataProductCart();

      return () => {
        controller.abort();
      };
    });

    return (
      <div class="container-all">
        <div class="container-title">
          <p>Productos a pagar</p>
          <p>Cantidad</p>
        </div>
        <div class="cart-products">
          {car_product.productResults.length > 0 ? (
            car_product.productResults.map((product: any) => {
              const cartDetails = calculateCartDetails(car_product);

              taxAmount.setTaxAmount = cartDetails.tax;
              shipping.setShipping = cartDetails.shippingCost;
              totalAmount.setTotalAmount = cartDetails.total;
              discount.setDiscount = cartDetails.descounts;
              subTotal.setsubTotal = cartDetails.subTotal;
              subTotalNoDiscount.setsubTotalNoDiscount = cartDetails.subTotalA;

              return (
                <>
                  <div class="container-cards-pay" key={product.dui}>
                    <Card1PRODUCTPAY product={product} />
                    <div class="container-quantity">{product.quantity}</div>
                  </div>
                </>
              );
            })
          ) : (
            <div class="loader"></div>
          )}
          <div class="container-edit-cart">
            {' '}
            <Link href="/v/cart/">Editar</Link>
          </div>
        </div>
      </div>
    );
  }
);
