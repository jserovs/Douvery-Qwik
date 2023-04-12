import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Tab } from './tabs/tab';
import styles from './vertical-tabs.css?inline';
export const VerticalTabs = component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();

  const tabs = [
    {
      path: '/a/user/my/',
      label: 'Mi cuenta',
      subTabs: [{ path: '/a/user/my/orders', label: 'Mis ordenes' }],
    },
    {
      path: '/a/user/verified-segure/',
      label: 'Cambio de password',
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
  return (
    <div class="container-all">
      <div>
        <div class="container-title">
          <p>Mi cuenta</p>
        </div>
        <div class="container-tabs">
          {tabs.map((tab, i) => (
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
