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
import { useLocation } from '@builder.io/qwik-city';
import type { Address } from '~/utils/types';
import { AddressChosenOne } from '~/components/(byServices)/Pay/sessions/address-chosen-one/address-chosen-one';
import { PaySelectCheckout } from '~/components/(byServices)/Pay/sessions/pay-select/pay-select';
import { ProductPay } from '~/components/(byServices)/Pay/sessions/product-pay/product-pay';
import { InfoPay } from '~/components/(byServices)/Pay/sessions/info-pay/info-pay';

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
            taxAmount={taxAmount.setTaxAmount}
            shipping={shipping.setShipping}
            totalAmount={totalAmount.setTotalAmount}
            subTotal={subTotal.setsubTotal}
            discount={discount.setDiscount}
            subTotalNoDiscount={subTotalNoDiscount.setsubTotalNoDiscount}
          />
        </div>
      </div>
    </>
  );
});
