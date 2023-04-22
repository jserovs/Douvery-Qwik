import {
  Slot,
  component$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Tab } from './tabs/tab';
import styles from './vertical-tabs-orders.css?inline';

export const VerticalTabsOrders = component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  const tabs = [
    {
      path: '/a/user/my/orders/view',
      label: 'View order',
      subTabs: [{ path: '/a/user/my/orders/view/', label: 'View order' }],
    },
    {
      path: '/a/user/my/orders/recent',
      label: 'Ordenes recientes',
      subTabs: [{ path: '/a/user/my/orders/recent/', label: 'Recientes' }],
    },
    {
      path: '/a/user/my/orders/completed',
      label: 'Historial ordenes',
      subTabs: [{ path: '/a/user/my/orders/completed', label: 'Completadas' }],
    },
  ];
  const tabsReport = [
    {
      path: '/a/user/my/reports',
      label: 'Historial ordenes',
      subTabs: [{ path: '/a/user/my/reports', label: 'Completadas' }],
    },
  ];
  const activeTab = useSignal('info');

  return (
    <div class="container-all">
      <div class="container-title">
        <p>My orders</p>
        <h6>Services</h6>
      </div>{' '}
      <div class="separator">
        <p>
          {loc.url.pathname == '/a/user/my/orders/recent/' && 'Orders recent'}
          {loc.url.pathname == '/a/user/my/orders/completed/' &&
            'Orders completed'}
          {loc.url.pathname.includes('/a/user/my/orders/view/') && 'View order'}
        </p>
        <hr class="line" />
      </div>
      <div class="container-content">
        <div class="nav">
          {' '}
          <div class="container-tabs">
            {(activeTab.value === 'info' ? tabs : tabsReport).map((tab, i) => (
              <div class="tabs" key={i}>
                <Tab
                  key={tab.path}
                  path={tab.path}
                  currentPath={loc.url.pathname}
                  label={tab.label}
                  subTabs={tab.subTabs}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Slot />
        </div>
      </div>
    </div>
  );
});
