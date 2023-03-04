import {
  component$,
  useBrowserVisibleTask$,
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
import { User, defaultUser, getData } from '~/services/auth/token/token';

interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}

export default component$(({ is }: any) => {
  useStylesScoped$(styles);

  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });

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

  const data = useStore<User>(defaultUser);

  useBrowserVisibleTask$(() => {
    const date = setInterval(() => {
      const { name } = getData();
      data.name = name;
    });
    return () => {
      clearInterval(date);
      const { name } = getData();
      data.name = name;
    };
  });
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
            <form class="searchTerm">
              <div class="select container">
                <select>
                  <option class="texts-opts-crt-gg" value="1">
                    All
                  </option>
                  <option class="texts-opts-crt-gg" value="2">
                    No JS
                  </option>
                  <option class="texts-opts-crt-gg" value="3">
                    Nice!
                  </option>
                </select>
              </div>
              <input
                type="text"
                class="searchTerm"
                placeholder="Busca tus futuros productos aquí ..."
                onClick$={() => (is.setIsOpen = true)}
                onInput$={(ev) =>
                  (state.searchInput = (ev.target as HTMLInputElement).value)
                }
              />
              {is.setIsOpen && (
                <>
                  <div class="suggestions">
                    {state.searchResults?.length ? (
                      <ul>
                        {state.searchResults.map((suggestion) => {
                          return (
                            <div class="crrtrSrers">
                              {' '}
                              <IconsSearch />
                              <li
                                class="lis-sgrs"
                                onClick$={() =>
                                  (state.selectedValue = suggestion)
                                }
                              >
                                {suggestion}
                              </li>
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
                name="button-search"
                type="submit"
                id="button-search"
                class="searchButton"
              >
                <div class="searc">
                  {' '}
                  <IconsSearch />
                </div>
              </button>
            </form>
          </div>
        </div>
        <div class="cajas">
          <div class="main">
            <a href="/cart" class="user">
              <DouveryCart />
              <div class="badget-circle">1</div>
            </a>
            <DouveryUser />
            <div class="cuenta_botom">
              <a class="title-desplg" href="/a/login">
                <span class="wl-hi">¡Hola! </span>
                <h4 class="pointer">{data.name ? data.name : '...'}</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
