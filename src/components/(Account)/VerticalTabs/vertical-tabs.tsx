import {
  $,
  Slot,
  component$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Tab } from './tabs/tab';
import styles from './vertical-tabs.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { useGetCurrentUser } from '~/routes/layout';

export const VerticalTabs = component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();
  const userACC = useGetCurrentUser().value;
  const tabs = [
    {
      path: '/a/user/all/',
      label: 'Todos',
      subTabs: [{ path: '/a/user/all/', label: 'Mas usados' }],
    },
    {
      path: '/a/user/my/',
      label: 'Mi',
      subTabs: [
        { path: '/a/user/my/orders', label: 'Mi ordenes' },
        { path: '/a/user/my/reports', label: 'Mi Lista de deseos' },
        { path: '/a/user/my/reports', label: 'Mi Futuras compras' },
        { path: '/a/user/my/reports', label: 'Mi Devoluciones' },
      ],
    },
    {
      path: '/a/user/verified-segure/',
      label: 'Hacer cambios',
      subTabs: [
        {
          path: '/a/user/verified-segure/changes/password',
          label: 'Cambiar contraseña',
        },
        {
          path: '/a/user/verified-segure/changes/address-delivery',
          label: 'Cambiar direccion de envio',
        },
      ],
    },
  ];
  const tabsReport = [
    {
      path: '/a/user/my/reports',
      label: 'Mis reportes',
      subTabs: [
        { path: '/a/user/my/reports', label: 'Mis reportes' },
        { path: '/a/user/report/new', label: 'Nuevo reporte' },
      ],
    },
  ];
  const activeTab = useSignal('info');
  const onClickTab = $((tab: any) => {
    activeTab.value = tab;
  });
  return (
    <div class="container-all">
      <div class="nav">
        {' '}
        <div class="container-header-nav">
          <div class="container-init">
            <div class="container-avatar">
              <img
                src={
                  userACC?.avatar
                    ? userACC?.avatar
                    : 'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
                }
                alt="Logo-1"
              />
            </div>
            <div>
              <div class="container-username">
                <TextCL text={userACC?.name ? userACC?.name : ''} />
                <div class="container-action-username"></div>
              </div>{' '}
              <p>Configuraciones de mi cuenta</p>
            </div>
          </div>
          <div class="container-action-header">
            <div
              class={activeTab.value === 'info' ? 'active' : ''}
              onClick$={() => {
                onClickTab('info');
              }}
            >
              <p>Informacion</p>
            </div>
            <div
              class={activeTab.value === 'report' ? 'active' : ''}
              onClick$={() => {
                onClickTab('report');
              }}
            >
              <p>Reportes</p>
            </div>
          </div>
        </div>
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
  );
});
