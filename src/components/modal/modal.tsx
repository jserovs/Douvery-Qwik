import {
  // Resource,
  component$,
  // useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './modal.css?inline';
import { DouveryGlobalSearch } from '../icons/global-search';
import { fetchCode } from '~/services/fechProduct';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { setCookiesDataZIPCODE } from '~/services/auth/code/zipCode';

import {
  divideAndMultiplyToken,
  generateToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
// import { fetchCodePostal } from '~/services/fechProduct';
// import type { CodePostalData } from '~/utils/types';
// import { cleanUpParamsCodePostal } from '~/utils/cleurs';

export const useZipCode = globalAction$(
  async ({ code }, { cookie, headers }) => {
    const token = generateToken(code, passwordKEY, serverKey);
    const nso = divideAndMultiplyToken(token, passwordKEY, serverKey);

    setCookiesDataZIPCODE(nso, cookie);

    headers.set('location', '/');
  },
  zod$({
    code: z.string({
      required_error: 'Code requerido',
    }),
  })
);

interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}

export const ModalButtonCou = component$(({ zipCode }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });

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

  const action = useZipCode();

  return (
    <div class="crt-button-modal-dr">
      <button
        onClick$={() => (isOpen.setIsOpen = true)}
        class="button-mds-view"
      >
        <DouveryGlobalSearch size="18" />
        {zipCode ? <>{zipCode}</> : <>Elige una ubicación</>}
      </button>

      {isOpen.setIsOpen && (
        <>
          {' '}
          <div
            class="crtr-modal"
            onClick$={() => (isOpen.setIsOpen = false)}
          ></div>
          <div class={`modal ${!isOpen && 'modal-close'}`}>
            <button onClick$={() => (isOpen.setIsOpen = false)}>
              Cerrar modal
            </button>
            <p>Contenido del modal</p>
            <div class="apleada">
              <input
                type="text"
                class="searchTerm"
                placeholder="Busca tus futuros productos aquí ..."
                onKeyUp$={(ev) =>
                  (state.searchInput = (ev.target as HTMLInputElement).value)
                }
              />
              <div
                class="butto"
                onClick$={(ev) =>
                  (state.searchInput = (ev.target as HTMLInputElement).value)
                }
              >
                <DouveryGlobalSearch size="18" />
              </div>

              <>
                <div class="suggestions">
                  {state.searchResults?.length ? (
                    <ul>
                      {state.searchResults.map((suggestion) => {
                        return (
                          <div class="crrtrSrers">
                            {' '}
                            <Form action={action}>
                              {' '}
                              <li class="lis-sgrs">
                                <input
                                  type="text"
                                  id="code"
                                  name="code"
                                  value={suggestion}
                                ></input>

                                {action.value?.fieldErrors?.code && (
                                  <span class="error">
                                    {action.value?.fieldErrors?.code}
                                  </span>
                                )}
                              </li>
                              <button class={'-button'}>
                                <span class="button-text">Agregar</span>
                              </button>
                            </Form>
                          </div>
                        );
                      })}
                    </ul>
                  ) : (
                    <></>
                  )}
                </div>

                <>{state.selectedValue}</>
              </>
            </div>

            {/* <div class="apleada">
              {' '}
              <h1>Enter your postcode, and I'll guess your age!</h1>
              <Resource
                value={codeResource}
                onPending={() => <div>Loading...</div>}
                onRejected={() => <div>Failed to person data</div>}
                onResolved={() => {
                  return <div></div>;
                }}
              />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
});
