import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './index.css?inline';
import H from '~/routes/(Stores)/[name]/STORE-[id]/h';
export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="container-all">
      {' '}
      <img
        width={1800}
        height={200}
        class="store-banner"
        src="https://res.cloudinary.com/douvery/image/upload/v1682891383/STORES/3465460B-51D47297-87C20FED/BANNERS/hqgxhnrjdgatkjvayqs8.webp"
        alt="STORE BANNER IMAGE Douvery Store Banner DOUVERY AND PRODUCT"
      />{' '}
      <H storeId="3465460B-51D47297-87C20FED" storeName="Douvery" />
    </div>
  );
});
