import {

  Slot,
  component$,

  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './vertical-tabs.css?inline';

import { NavBarDrawer } from './navBar-drawer/navBar-drawer';

export const VerticalTabs = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="container-all">
      <NavBarDrawer />
      <div class="container-content">
        <Slot />
      </div>
    </div>
  );
});
