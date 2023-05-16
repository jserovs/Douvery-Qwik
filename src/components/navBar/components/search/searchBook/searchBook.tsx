import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { IconsSearch } from '~/components/icons/search';

import { fetchSuggestions } from '~/services/fechProduct';
import styles from './searchBook.css?inline';
interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}
export const SearchBooksDouvery = component$(({ is }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
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
  const selectedValue = useStore({ selectedValue: 'all' });
  const { url } = useLocation();
  const or_ly = url.searchParams.has('or-ly')
    ? `&or-ly=${url.searchParams.get('or-ly')}`
    : '';

  return (
    <>
      <div class="search">
        <div class="searchTerm">
          <div class="select ">
            <select
              value={'Books'}
              onChange$={(event) =>
                (selectedValue.selectedValue = event.target.value)
              }
            >
              <option value="Books">Books</option>
            </select>
          </div>

          <input
            type="text"
            class="searchTerm"
            placeholder="Busca tu libros favorito"
            onClick$={() => (is.setIsOpen = true)}
            onKeyUp$={(ev) =>
              (state.searchInput = (ev.target as HTMLInputElement).value)
            }
            onKeyDown$={(ev) => {
              if (ev.key === 'Enter') {
                is.setIsOpen = false;
                nav(
                  '/s/?q=' +
                    state.searchInput.replace(/ /g, '+') +
                    '&or-c=' +
                    selectedValue.selectedValue +
                    or_ly +
                    '',
                  true
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
                          key={suggestion}
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
                  state.searchInput.replace(/ /g, '+') +
                  '&or-c=' +
                  selectedValue.selectedValue +
                  '' +
                  or_ly,
                true
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
    </>
  );
});
