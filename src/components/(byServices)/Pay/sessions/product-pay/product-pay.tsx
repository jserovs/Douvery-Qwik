import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './product-pay.css?inline';
import { Link, useLocation } from '@builder.io/qwik-city';
import { getDataProductCart } from '~/services/cart/cart';
import type { Product } from '~/utils/types';
import { Card1PRODUCTPAY } from '~/components/cards/buy/pay/card1/product-pay';

export interface IState {
  productResults: Product[];
}

export const ProductPay = component$(
  ({
    totalAmount,
    shipping,
    taxAmount,
    subTotal,
    discount,
    subTotalNoDiscount,
  }: any) => {
    useStylesScoped$(styles);
    const url = useLocation();
    const state = useStore<IState>({
      productResults: [],
    });
    useVisibleTask$(async ({ track }) => {
      track(() => url.pathname);

      const controller = new AbortController();
      state.productResults = await getDataProductCart();

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
          {state.productResults.length > 0 ? (
            state.productResults.map((product) => {
              const taxRate = 0.1; // Por ejemplo, un impuesto del 10%
              const shippingCost = 5; // Establece un costo de envío fijo, si es necesario

              const subTotalA = state.productResults.reduce(
                (accumulator, product) => {
                  return accumulator + product.price * product.quantity;
                },
                0
              );
              const descounts = state.productResults.reduce(
                (accumulator, product) => {
                  const discountAmount =
                    product.price * (product.discount / 100) * product.quantity;
                  return accumulator + discountAmount;
                },
                0
              );

              subTotal.setsubTotal = parseFloat(
                (subTotalA - descounts).toFixed(2)
              );
              discount.setDiscount = descounts;
              subTotalNoDiscount.setsubTotalNoDiscount = subTotalA;

              // Calcular el impuesto
              const tax = parseFloat(
                (subTotal.setsubTotal * taxRate).toFixed(2)
              );

              // Calcular el total incluyendo el impuesto y el costo de envío (si lo hay)
              const total = parseFloat(
                (subTotal.setsubTotal + tax + shippingCost).toFixed(2)
              );

              // Guardar el impuesto, el costo de envío y el total
              taxAmount.setTaxAmount = tax;
              shipping.setShipping = shippingCost;
              totalAmount.setTotalAmount = total;
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
