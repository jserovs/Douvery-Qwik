import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './navBar.css?inline';

import { DouveryUser } from '../icons/user';
import { DouveryCart } from '../icons/cart';
import { DouveryLogo105X40PX } from '../icons/logo105X40';
import { fetchSuggestions } from '~/services/fechProduct';

import { ProfileDropdown } from '../dropdown/header-profile-user/profile-dropdown';
import { useLocation } from '@builder.io/qwik-city';

import { useGetCurrentCartQuatity } from '~/routes/layout';
import { SearchDouvery } from './components/search/search';

interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}

export default component$(({ is, user, zipCode, userCoun }: any) => {
  useStylesScoped$(styles);

  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });
  zipCode;
  userCoun;

  useTask$(async ({ track }) => {
    const searchInput = track(() => state.searchInput);

    if (!searchInput) {
      state.searchResults = [];
      return;
    }

    const controller = new AbortController();
    state.searchResults = await fetchSuggestions(state.searchInput, controller);

    return () => {
      controller.abort();
    };
  });

  const getCartQty = useGetCurrentCartQuatity().value;
  const { url } = useLocation();
  return (
    <header>
      <div class="container-cajas-header ">
        <div class="cajas">
          <a href="/" class="logo" aria-label="Douvery">
            <DouveryLogo105X40PX />
          </a>
        </div>
        <div class="cajas">
          <SearchDouvery is={is} />
        </div>
        <div class="cajas">
          <div class="main">
            <div class="container-icon-cart">
              {' '}
              <a href="/v/cart" class="user">
                <DouveryCart />
                <div class="badget-circle">{getCartQty ? getCartQty : 0}</div>
              </a>
            </div>
            <div class="icon-douvery-user">
              <DouveryUser />
            </div>
            {user ? (
              <>
                {' '}
                <ProfileDropdown user={user} />
              </>
            ) : (
              <>
                {' '}
                <div class="ctr-session-none">
                  {' '}
                  <a
                    class="trl-drs"
                    href={'/a/login?rr=' + url.pathname + url.search}
                  >
                    <p class="ttle-draw">
                      <strong class="text-hello"> Hello,</strong>{' '}
                      <strong> Iniciar Session</strong>
                    </p>{' '}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
