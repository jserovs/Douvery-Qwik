import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { HorizontalTabsStores } from '~/components/(Stores)/HorizontalTabsStore/horizontal-tabs-store';

export default component$(() => {
  useStylesScoped$(`
   div {
    min-height: 100rem ;
   background-color: var(--color-background-white);
     }
   
  `);
  return (
    <div>
      <HorizontalTabsStores>
        <Slot />
      </HorizontalTabsStores>
    </div>
  );
});



export const head: DocumentHead = ({ params }) => {

  return {
    title: `${params.name} - Douvery`,
    meta: [
      {
        name: 'description',
        content: 'Douvery store in Douvery',
      },
      {
        name: 'dui',
        content: params.id,
      },

    ],
  };
};

