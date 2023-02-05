import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ContainerCombinedBySeller } from './components/container-combined-by-seller';
import styles from './view2.css?inline';
import { ContainerCombinedAGG } from './components/container-combined-agg';
export const View2 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const data = [
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
  ];
  return (
    <div class="crtr-views2">
      <div class="combined">
        {' '}
        <ContainerCombinedBySeller SRTproduct={product} data={data} />
        <ContainerCombinedAGG totalPrice="$15" />
      </div>
    </div>
  );
});
