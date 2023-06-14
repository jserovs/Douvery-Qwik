import { component$ } from '@builder.io/qwik';

export const UseProductDetailsLink = component$(({ product }: any) => {
  return <>{`/v/${product.slug}/${product.dui}`}</>;
});
