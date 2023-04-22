import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { useGetCurrentUser } from '~/routes/layout';
import { fetchCode } from '~/services/fechProduct';
import styles from './index.css?inline';
interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}
export default component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;

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
    state.searchResults = await fetchCode(state.searchInput, controller);

    return () => {
      controller.abort();
    };
  });

  return (
    <div class="container-all">
      <div class="container-title">
        <p>Search you orders</p>
      </div>
      <div class="container">
        {user ? <> </> : <> </>}
        <div class="apleada">
          <div class="search-container">
            <i class="fa fa-search search-icon"></i>
            <input
              type="text"
              class="search-input"
              placeholder="Zip Code , City , State , Country"
              onKeyUp$={(ev) =>
                (state.searchInput = (ev.target as HTMLInputElement).value)
              }
            />
          </div>
          <div
            class="butto"
            onClick$={(ev) =>
              (state.searchInput = (ev.target as HTMLInputElement).value)
            }
          ></div>

          <>
            <div class="suggestions">
              {state.searchResults?.length ? (
                <ul>
                  {state.searchResults.map((suggestion) => {
                    return (
                      <>
                        {' '}
                        <li class="lis-sgrs">{suggestion}</li>
                        <button class={'-button'}>
                          <span class="button-text">Agregar</span>
                        </button>
                      </>
                    );
                  })}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
});
