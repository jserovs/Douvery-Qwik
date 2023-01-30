import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-hrs-butros.css?inline';
import { DouveryHeart } from '~/components/icons/heart';
import { DouveryInfo } from '~/components/icons/info';
export const ContainerButtonExtr = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="crtr-brst-csr">
      <div class="whastlit">
        <span>
          <DouveryHeart size="15px" />
          Add to Wishlist
        </span>
      </div>
      <div class="infor-srgrs">
        <span>
          <DouveryInfo size="15px" /> Suggest information
        </span>
      </div>
    </div>
  );
});
