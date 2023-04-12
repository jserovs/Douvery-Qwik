import { Slot, component$ } from '@builder.io/qwik';
import { VerticalTabs } from '~/components/(Account)/VerticalTabs/vertical-tabs';

export default component$(() => {
  return (
    <div>
      <VerticalTabs>
        <Slot />
      </VerticalTabs>
    </div>
  );
});
