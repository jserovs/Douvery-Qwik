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
import { DouveryIconVerifyBrand } from '~/components/icons/verify';

import { Stars } from '~/components/Ratings/stars/stars';
import { ButtonFollowStore } from './components/button-follow-store/button-follow-store';

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

  const followers = useSignal(0);
  const storeResource = useResource$<void>(async () => {
    const data = await fetchStore(location.params.id);
    state.store = data;
    followers.value = data.followersCount;
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
            <div class="store-header">
              <nav class="navbar">
                <div class="logo">
                  <img src={state.store.design.logo} alt="" />
                  <a href="#">Douvery</a>
                  <DouveryIconVerifyBrand size="20" />
                </div>
                <ul class="nav-links">
                  <li>
                    <a href="#">Mobile</a>
                  </li>
                  <li>
                    <a href="#">TV & AV</a>
                  </li>
                  <li>
                    <a href="#">Electrodomésticos</a>
                  </li>
                  <li>
                    <a href="#">Informática</a>
                  </li>

                  <li>
                    <a href="#">SmartThings</a>
                  </li>
                  <li>
                    <a href="#">Ofertas</a>
                  </li>
                  <li>
                    <a href="#">Soporte</a>
                  </li>
                </ul>

                <div class="nav-search-cart-login">
                  <input
                    type="text"
                    placeholder="Búsqueda"
                    class="nav-search"
                  />
                </div>
              </nav>
              <img
                class="store-banner"
                src={state.store.design.banners[0]}
                alt="STORE Banner"
              />
              <div class="container-tabs">
                <ul class="tab-links">
                  <li class="active">
                    <a href="#tab1">Mobile</a>
                  </li>
                  <li>
                    <a href="#tab2">TV & AV</a>
                  </li>
                  <li>
                    <a href="#tab3">Electrodomésticos</a>
                  </li>
                  <li>
                    <a href="#tab4">Informática</a>
                  </li>
                </ul>
                <ul class="tab-links">
                  <li>
                    <p>{followers.value}</p>
                    <p>Followers</p>
                    <ButtonFollowStore followers={followers} />
                  </li>
                  <li>
                    <a href="#tab1">About store</a>
                  </li>
                </ul>
                <ul class="tab-links">
                  <li>
                    <a href="#tab1">
                      <span>
                        {' '}
                        <Stars
                          color="#394867"
                          rating={state.store.averageProductRating}
                        />{' '}
                      </span>
                      <p>
                        {state.store.averageProductRating}(
                        {state.store.totalRatingsCount})
                      </p>
                      <p>Calification</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="nav">
              <div class="container">
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
