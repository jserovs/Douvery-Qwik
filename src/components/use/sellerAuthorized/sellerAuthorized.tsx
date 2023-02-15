import { DouveryIconVerifyBrand } from '~/components/icons/verify';
import styles from './sellerAuthorized.css?inline';
import { component$, useStylesScoped$ } from '@builder.io/qwik';

export const UseSellerAuthorized = component$(({ name }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="ctr-seller">
      {' '}
      <hs-sr1>{name}</hs-sr1>
      <DouveryIconVerifyBrand size="18" color="#0071FF" />
    </div>
  );
});
