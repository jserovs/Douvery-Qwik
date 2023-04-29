import {
  Resource,
  Slot,
  component$,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

import styles from './horizontal-tabs-store.css?inline';

import { useGetCurrentUser } from '~/routes/layout';
import { TabStores } from './tabs-store/tab';
import { fetchStore } from '~/services/store/store';
import type { Store } from '~/utils/types/stores';

export const HorizontalTabsStores = component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();
  const userACC = useGetCurrentUser().value;
  const tabs = [
    {
      path: '/a/user/all/',
      label: 'HOME',
      subTabs: [{ path: '/a/user/all/', label: 'Mas usados' }],
    },
    {
      path: '/a/user/profile/',
      label: 'MI perfil',
      subTabs: [
        { path: `/a/user/profile/${userACC?.name}/`, label: userACC?.name },
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

  const state = useStore<{
    store: Store;
  }>({
    store: {} as Store,
  });

  const storeResource = useResource$<void>(async () => {
    const data = await fetchStore(location.params.id);
    state.store = data;
  });
  return (
    <div class="container-all">
      <Resource
        value={storeResource}
        onPending={() => <div class="loader "></div>}
        onRejected={() => (
          <>
            Al parecer, hay un error en la solicitud. Por favor, actualiza la
            página para verificar nuevamente.
          </>
        )}
        onResolved={() => (
          <>
            <div class="channel-header">
              <img
                class="channel-banner"
                src={state.store.design.banners[1]}
                alt="Channel Banner"
              />
              <div class="channel-info">
                <div class="store-info-name">
                  <img
                    class="channel-avatar"
                    src={state.store.design.logo}
                    alt="Channel Avatar"
                  />
                  <div class="channel-name-subscribers">
                    <h1 class="channel-name">{state.store.name}</h1>
                    <span class="channel-subscribers">123K subscribers</span>
                  </div>
                  <button class="subscribe-button">Subscribe</button>
                </div>
                <input
                  class="search-bar"
                  type="search"
                  placeholder="Search channel"
                />
              </div>
              <nav class="channel-navigation">
                <a href="#">Home</a>
                <a href="#">Videos</a>
                <a href="#">Playlists</a>
                <a href="#">Community</a>
                <a href="#">Channels</a>
                <a href="#">About</a>
              </nav>
            </div>
            <div class="nav">
              <div class="container-tabs">
                {(activeTab.value === 'info' ? tabs : tabsReport).map(
                  (tab, i) => (
                    <div class="tabs" key={i}>
                      <TabStores
                        key={tab.path}
                        path={tab.path}
                        currentPath={location.url.pathname}
                        label={tab.label}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div class="container-content">
              <Slot />
            </div>
          </>
        )}
      />
    </div>
  );
});
