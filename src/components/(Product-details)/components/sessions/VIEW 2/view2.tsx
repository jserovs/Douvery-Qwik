import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ContainerCombinedBySeller } from './components/container-combined-by-seller';
import styles from './view2.css?inline';
import { ContainerSponsoreProduct } from './components/container-sponsore';
import { ContainerBasicFeacture } from './components/container-basic-feature';
import { ContainerShoppingFeacture } from './components/container-shopping-feature';
export const View2 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="crtr-views2">
      <div class="viewleft">
        <div class="combined">
          {' '}
          <ContainerCombinedBySeller SRTproduct={product} product={product} />
          <div class="crtr-characte">
            {' '}
            <ContainerBasicFeacture product={product} />
            <ContainerShoppingFeacture />
          </div>
        </div>
      </div>
      <div class="viewrigth">
        <ContainerSponsoreProduct product={product} />
      </div>
    </div>
  );
});
