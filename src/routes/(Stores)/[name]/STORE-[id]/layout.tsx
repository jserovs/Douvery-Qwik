import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';

import { HorizontalTabsStores } from '~/components/(STORES)/HorizontalTabsStore/horizontal-tabs-store';

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
