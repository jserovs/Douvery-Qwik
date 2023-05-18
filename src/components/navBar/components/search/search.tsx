import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { IconsSearch } from '~/components/icons/search';
import { category } from '~/routes/(Search)/s';
import { fetchSuggestions } from '~/services/fechProduct';
import styles from './search.css?inline';
interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}
export const SearchDouvery = component$(({ is }: any) => {
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
  const selectedValue = useStore({ selectedValue: 'all' });

  return (
    <>
      <form class="search" action={'/s/'}>
        <div class="searchTerm">
          <div class="select ">
            <select
              name="or-c"
              value={selectedValue.selectedValue}
              onChange$={(event) =>
                (selectedValue.selectedValue = event.target.value)
              }
            >
              {category.map((c, i) => (
                <>
                  {' '}
                  <option value={c.value} key={i}>
                    {c.name}
                  </option>
                </>
              ))}
            </select>
          </div>

          <input
            type="text"
            class="searchTerm"
            name="q"
            placeholder="Busca tu producto"
            onClick$={() => (is.setIsOpen = true)}
            onKeyUp$={(ev) =>
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

          <button aria-label="button-search" type="submit" class="searchButton">
            <div class="searc">
              {' '}
              <IconsSearch />
            </div>
          </button>
        </div>
      </form>
    </>
  );
});
