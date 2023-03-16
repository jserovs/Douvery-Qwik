import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './header.css?inline';

import { DouveryUser } from '../icons/user';
import { DouveryCart } from '../icons/cart';
import { DouveryLogo105X40PX } from '../icons/logo105X40';
import { fetchSuggestions } from '~/services/fechProduct';
import { IconsSearch } from '../icons/search';
import { ProfileDropdown } from '../dropdown/header-profile-user/profile-dropdown';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { category } from '~/routes/(Search)/s';

interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}

export default component$(({ is, user, zipCode, userCoun }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
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
  const selectedValue = useStore({ selectedValue: 'all' });
  const {url} = useLocation();
  const or_ly = url.searchParams.has('or-ly')
  ? `&or-ly=${url.searchParams.get('or-ly')}`
  : '';
  return (
    <header>
      <div class="container container-cajas-header ">
        <div class="cajas">
          <a href="/" class="logo" aria-label="Douvery">
            <DouveryLogo105X40PX />
          </a>
        </div>

        <div class="cajas">
          <div class="search">
            <div class="searchTerm">
              <div class="select ">
                <select
                  value={selectedValue.selectedValue}
                  onChange$={(event) =>
                    (selectedValue.selectedValue = event.target.value)
                  }
                >
                  {category.map((c) => (
                    <>
                      {' '}
                      <option value={c.value}>{c.name}</option>
                    </>
                  ))}
                </select>
              </div>

              <input
                type="text"
                class="searchTerm"
                placeholder="Busca tu producto"
                onClick$={() => (is.setIsOpen = true)}
                value={state.searchInput}
                onInput$={(ev) =>
                  (state.searchInput = (ev.target as HTMLInputElement).value)
                }
                onKeyDown$={(ev) => {
                  if (ev.key === 'Enter') {
                    is.setIsOpen = false;
                    nav(
                      '/s/?q=' +
                        state.searchInput +
                        '&or-c=' +
                        selectedValue.selectedValue +
                        or_ly +
                        ''
                    );
                  }
                }}
              />

              {is.setIsOpen && (
                <>
                  <div class="suggestions">
                    {state.searchResults?.length ? (
                      <ul>
                        {state.searchResults.map((suggestion) => {
                          return (
                            <div
                              class="crrtrSrers"
                              onClick$={() => {
                                state.searchInput = suggestion;
                              }}
                            >
                              {' '}
                              <IconsSearch />
                              <li class="lis-sgrs">{suggestion}</li>
                            </div>
                          );
                        })}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}

              <button
                aria-label="button-search"
                type="submit"
                class="searchButton"
                onClick$={() => {
                  is.setIsOpen = false;
                  nav(
                    '/s/?q=' +
                      state.searchInput +
                      '&or-c=' +
                      selectedValue.selectedValue +
                      ''+ or_ly
                  );
                }}
              >
                <div class="searc">
                  {' '}
                  <IconsSearch />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="cajas">
          <div class="main">
            <a href="/cart" class="user">
              <DouveryCart />
              <div class="badget-circle">1</div>
            </a>
            <DouveryUser />

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
