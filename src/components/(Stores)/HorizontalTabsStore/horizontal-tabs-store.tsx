import {
  Resource,
  Slot,
  component$,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './horizontal-tabs-store.css?inline';

import { fetchStore } from '~/services/store/store';
import type { Store } from '~/utils/types/stores';

import { Stars } from '~/components/Ratings/stars/stars';
import { ButtonFollowStore } from './components/button-follow-store/button-follow-store';

import { NavBarDrawerStore } from './navbar-drawer-store/navbar-drawer-store';
import { LogoNameStore } from './components/logo-name-store/logo-name-store';
import { Link, useLocation } from '@builder.io/qwik-city';

export const HorizontalTabsStores = component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  const tabs = [
    {
      path:
        '/' +
        loc.params.name +
        '/' +
        'STORE-' +
        loc.params.id +
        '/' +
        'h' +
        '/',
      label: 'Home',
    },
    {
      path:
        '/' +
        loc.params.name +
        '/' +
        'STORE-' +
        loc.params.id +
        '/' +
        'products-discounts' +
        '/',
      label: 'Articulos en ofertas',
    },
    {
      path:
        '/' +
        loc.params.name +
        '/' +
        'STORE-' +
        loc.params.id +
        '/' +
        'products-all' +
        '/',
      label: 'Todos los articulos',
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
    const data = await fetchStore(loc.params.id);
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
            <div class="header-tabs-wrapper">
              <div class="store-header">
                <div class="nav">

                  < NavBarDrawerStore state={state} />
                  <div class="lgo-movl">
                    <LogoNameStore state={state} />
                  </div>
                </div>
                <img
                  class="store-banner"
                  src={state.store.design.banners[0]}
                  alt="STORE Banner"
                />
                <div class="container-tabs">
                  <ul class="tab-links tabs">
                    {(activeTab.value === 'info' ? tabs : tabsReport).map(
                      (tab, i) => (
                        <li
                          class={`tabs ${loc.url.pathname == tab.path ? 'active' : ''
                            }`}
                          key={i}
                        >
                          <Link href={tab.path}>{tab.label} </Link>
                        </li>
                      )
                    )}
                  </ul>
                  <ul class="tab-links follow">
                    <li>
                      <Link
                        href={
                          '/' +
                          loc.params.name +
                          '/' +
                          'STORE-' +
                          loc.params.id +
                          '/' +
                          'f' +
                          '/' +
                          'followers'
                        }
                      >
                        <div class="followers">
                          <p>{followers.value}</p>
                          <p class="text-follow">Followers</p>
                        </div>
                      </Link>
                      <ButtonFollowStore followers={followers} />
                    </li>
                    <li
                      class={`tabs  ${loc.url.pathname.includes('/a/') ? 'active' : ''
                        }`}
                    >
                      <Link
                        href={
                          '/' +
                          loc.params.name +
                          '/' +
                          'STORE-' +
                          loc.params.id +
                          '/a'
                        }
                      >
                        About store
                      </Link>
                    </li>
                  </ul>
                  <ul class="tab-links">
                    <li>
                      <div class="container-calification">
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
                      </div>
                    </li>
                  </ul>
                </div>
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

