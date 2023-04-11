import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { fetchIndexAddressUser } from '~/services/user/address/address';
import { useGetCurrentUser } from '~/routes/layout';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';
import type { Address } from '~/utils/types';
import { AddressChosenOne } from '~/components/(byServices)/Pay/sessions/address-chosen-one/address-chosen-one';
import { PaySelectCheckout } from '~/components/(byServices)/Pay/sessions/pay-select/pay-select';
import {
  type Icar_product,
  ProductPay,
} from '~/components/(byServices)/Pay/sessions/product-pay/product-pay';
import { InfoPay } from '~/components/(byServices)/Pay/sessions/info-pay/info-pay';

import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (!acccessToken) {
    throw redirect(302, '/a/login?rr=/by/segure/address/');
  }
};

export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;

  const state = useStore<{
    address: Address;
  }>(
    {
      address: {} as Address,
    },
    { recursive: true }
  );
  const car_product = useStore<Icar_product>({
    productResults: [],
  });

  const taxAmount = useStore({ setTaxAmount: 0 });
  const shipping = useStore({ setShipping: 0 });
  const totalAmount = useStore({ setTotalAmount: 0 });
  const subTotal = useStore({ setsubTotal: 0 });
  const subTotalNoDiscount = useStore({ setsubTotalNoDiscount: 0 });
  const discount = useStore({ setDiscount: 0 });

  const loc = useLocation();

  const addressResource = useResource$<void>(async ({ track }) => {
    track(() => loc.params.adr);
    const data = await fetchIndexAddressUser(
      `${userACC?.token}`,
      `${userACC?.id}`,
      loc.params.adr
    );
    state.address = data;
  });

  const selectedMethod = useStore({ setSelectedMethod: '' });
  return (
    <>
      <div class="container-all">
        <div class="container-info-user">
          <div class="container-pay">
            <div class="container-header">
              <p>
                {' '}
                Selecciona o agrega un metodo de pago para realizar tu pedido.
              </p>
            </div>

            <PaySelectCheckout selectedMethod={selectedMethod} />
            <Resource
              value={addressResource}
              onPending={() => <div class="loader"></div>}
              onRejected={(error) => <>Error: {error.message}</>}
              onResolved={() => (
                <div>
                  <AddressChosenOne state={state} />
                </div>
              )}
            />

            <ProductPay
              car_product={car_product}
              taxAmount={taxAmount}
              shipping={shipping}
              totalAmount={totalAmount}
              subTotal={subTotal}
              discount={discount}
              subTotalNoDiscount={subTotalNoDiscount}
            />
          </div>
        </div>

        <div class="container-info-pay">
          <InfoPay
            car_product={car_product}
            taxAmount={taxAmount.setTaxAmount}
            address={state.address}
            shipping={shipping.setShipping}
            totalAmount={totalAmount.setTotalAmount}
            subTotal={subTotal.setsubTotal}
            discount={discount.setDiscount}
            subTotalNoDiscount={subTotalNoDiscount.setsubTotalNoDiscount}
            selectedMethod={selectedMethod}
          />
        </div>
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: 'Douvery: Segure purchase - Selecciona o agrega  dirección de envio.',
};
