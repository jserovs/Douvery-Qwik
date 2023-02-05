import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ContainerCombinedBySeller } from './components/container-combined-by-seller';
import styles from './view2.css?inline';
export const View2 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crtr-views2">
      <ContainerCombinedBySeller product={product} />
    </div>
  );
});
