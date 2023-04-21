import {
  $,
  Slot,
  component$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { Tab } from './tabs/tab';
import styles from './vertical-tabs-orders.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { TextCL } from '~/components/use/textCL/textCL';

export const VerticalTabsOrders = component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();
  const userACC = useGetCurrentUser().value;
  const tabs = [
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
        <p>Pending orders</p>
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
                  currentPath={location.url.pathname}
                  label={tab.label}
                  subTabs={tab.subTabs}
                />
              </div>
            ))}
          </div>
        </div>

        <div class="container-content">
          <Slot />
        </div>
      </div>
    </div>
  );
});
