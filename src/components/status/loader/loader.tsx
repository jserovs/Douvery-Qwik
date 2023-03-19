import { component$ } from '@builder.io/qwik';

export const Loader = component$(({ True }: any) => {
  return <>{True ? <div class="loader"></div> : ''}</>;
});
