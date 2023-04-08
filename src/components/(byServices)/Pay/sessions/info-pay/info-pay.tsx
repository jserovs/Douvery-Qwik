import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './info-pay.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { NamePaypalIcon } from '~/components/icons/paypal';
import { useGetCurrentUser } from '~/routes/layout';

export const InfoPay = component$(
  ({
    car_product,
    totalAmount,
    shipping,
    taxAmount,
    subTotal,
    discount,
    subTotalNoDiscount,
    selectedMethod,
    address,
  }: any) => {
    useStylesScoped$(styles);
    const loader = useStore({ setLoader: false });
    const userACC = useGetCurrentUser().value;

    const createOrder = $(async () => {
      try {
        loader.setLoader = true;
        const cartItems = car_product.productResults.map((product: any) => {
          return {
            name: product.name,
            dui: product.dui,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
          };
        });

        const response = await fetch(
          'http://localhost:9039/create-paypal-order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userACC?.id,
              cart: [...cartItems],
              totalAmout: totalAmount,
              totalTaxt: taxAmount,
              shipping: shipping,
              shippingAddress: address,
              paymentMethod: 'paypal',
            }),
          }
        );

        const orderData = await response.json();

        const approveLink = orderData.links.find(
          (link: any) => link.rel === 'approval_url'
        );

        if (approveLink) {
          window.location.href = approveLink.href;
        }
        return orderData.id;
      } catch (error) {
        console.error('Error al crear la orden:', error);
      }
    });

    const handleClickPaypal = $(async () => {
      try {
        await createOrder();
      } catch (error) {
        console.error('Error en el proceso de pago:', error);
      }
    });
    return (
      <div class="container-all">
        {' '}
        <div class="container-title">
          <p>Order Summary</p>
        </div>
        <div class="container-discount">
          <ul>
            <li>Subtotal before</li>
            <li>
              <UsePrice price={subTotalNoDiscount} />
            </li>
          </ul>
          <ul>
            <li>Discount</li>
            <li>
              <UsePrice price={discount} />
            </li>
          </ul>
        </div>
        <div class="container-now">
          <ul>
            <li>Subtotal now</li>
            <li>
              {' '}
              <UsePrice price={subTotal} />
            </li>
          </ul>
          <ul>
            <li>Shipping</li>
            <li>
              {' '}
              <UsePrice price={shipping} />
            </li>
          </ul>
          <ul>
            <li>Taxt</li>
            <li>
              {' '}
              <UsePrice price={taxAmount} />
            </li>
          </ul>
        </div>
        <div class="container-total">
          <ul>
            <li>
              <strong>Total</strong>
            </li>
            <li>
              <strong> ${totalAmount}</strong>
            </li>
          </ul>
        </div>
        <div class="container-terms-services">
          <div class="terms-and-conditions">
            {' '}
            <p>
              Al continuar, aceptas nuestros{' '}
              <a href="#">Términos y condiciones</a>.
            </p>
          </div>
        </div>
        <div class="container-buttons-pay">
          {selectedMethod.setSelectedMethod === 'paypal' ? (
            <button class="button-paypal" onClick$={handleClickPaypal}>
              {loader.setLoader ? (
                <>
                  <div class="loader"></div>
                </>
              ) : (
                <NamePaypalIcon />
              )}{' '}
            </button>
          ) : (
            ''
          )}{' '}
        </div>
      </div>
    );
  }
);
