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
import { fetchCode, fetchIpInfo } from '~/services/fechProduct';
import {
  Form,
  globalAction$,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
import {
  setCookiesDataCountry,
  setCookiesDataZIPCODE,
} from '~/services/auth/code/zipCode';

import {
  divideAndMultiplyToken,
  generateToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { DouveryArrowRigth1 } from '../icons/arrow-right-1';
import { useGetCurrentUser, useGetCurrentZipCode } from '~/routes/layout';

// import { fetchCodePostal } from '~/services/fechProduct';
// import type { CodePostalData } from '~/utils/types';
// import { cleanUpParamsCodePostal } from '~/utils/cleurs';

export const useZipCode = globalAction$(
  async ({ code }, { cookie, headers }) => {
    const token = generateToken(code, passwordKEY, serverKey);
    const nso = divideAndMultiplyToken(token, passwordKEY, serverKey);

    setCookiesDataZIPCODE(nso, cookie);

    const token2 = generateToken(await fetchIpInfo(), passwordKEY, serverKey);
    const nso2 = divideAndMultiplyToken(token2, passwordKEY, serverKey);

    setCookiesDataCountry(nso2, cookie);

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

export const ModalButtonCou = component$(() => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const user = useGetCurrentUser().value;
  const zipCode = useGetCurrentZipCode().value;
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
  const nav = useNavigate();
  return (
    <div class="crt-button-modal-dr">
      <button
        onClick$={() => (isOpen.setIsOpen = true)}
        class="button-mds-view"
      >
        {zipCode ? <>{zipCode}</> : <>Escoger una ubicación</>}
      </button>

      {isOpen.setIsOpen && (
        <>
          {' '}
          <div
            class="crtr-modal"
            onClick$={() => (isOpen.setIsOpen = false)}
          ></div>
          <div class="crtr-modal-content">
            <div class={`modal ${!isOpen && 'modal-close'}`}>
              <div class="ctr-title-modal">
                <p>Indica dónde te encuentras</p>
              </div>{' '}
              {user ? (
                <div class="true-loggin">
                  <div class="form-group need-account">
                    <a
                      href="/a/user/verified-segure/changes/address-delivery/"
                      class="forgot-new-account-link"
                    >
                      Editar mi dirección
                    </a>
                  </div>
                </div>
              ) : (
                <div class="ctr-button-login-modal">
                  <div class="clg-pesorso-experi">
                    {' '}
                    <p>Personaliza tu experiencia </p>
                    <div class="ctr-arrow-exp">
                      {' '}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9991 18.2501C12.8091 18.2501 12.6191 18.1801 12.4691 18.0301L6.39914 11.9601C6.10914 11.6701 6.10914 11.1901 6.39914 10.9001C6.68914 10.6101 7.16914 10.6101 7.45914 10.9001L12.9991 16.4401L18.5391 10.9001C18.8291 10.6101 19.3091 10.6101 19.5991 10.9001C19.8891 11.1901 19.8891 11.6701 19.5991 11.9601L13.5291 18.0301C13.3791 18.1801 13.1891 18.2501 12.9991 18.2501Z"
                          fill="#333"
                        />
                        <path
                          d="M13 18C12.4533 18 12 17.6661 12 17.2635V0.736498C12 0.333879 12.4533 0 13 0C13.5467 0 14 0.333879 14 0.736498V17.2635C14 17.6661 13.5467 18 13 18Z"
                          fill="#333"
                        />
                        <path
                          d="M13 18C12.4533 18 12 17.6661 12 17.2635V0.736498C12 0.333879 12.4533 0 13 0C13.5467 0 14 0.333879 14 0.736498V17.2635C14 17.6661 13.5467 18 13 18Z"
                          fill="#333#333"
                        />
                        <path
                          d="M13.5173 1.1652C13.5262 1.80217 13.2831 2.33388 12.9811 2.33808L0.584829 2.51039C0.28284 2.51459 0.0250672 1.98984 0.0162131 1.35286C0.00735895 0.715885 0.250446 0.184178 0.552435 0.17998L12.9487 0.00766932C13.2507 0.00347162 13.5085 0.528217 13.5173 1.1652Z"
                          fill="#333"
                        />
                      </svg>
                    </div>
                  </div>
                  <button onClick$={() => nav('/a/login/')}>
                    Iniciar Sesión
                  </button>{' '}
                </div>
              )}
              <div class="card">
                <div class="card-title">Información de envio</div>
                <div class="card-text">
                  Actualmente {zipCode ? <></> : <>no</>} tienes seleccionado{' '}
                  <span class="highlight">
                    {zipCode !== null && zipCode.toString()}
                  </span>
                  .
                </div>
              </div>
              {user ? <> </> : <> </>}
              <div class="apleada">
                <div class="search-container">
                  <i class="fa fa-search search-icon"></i>
                  <input
                    type="text"
                    class="search-input"
                    placeholder="Zip Code , City , State , Country"
                    onKeyUp$={(ev) =>
                      (state.searchInput = (
                        ev.target as HTMLInputElement
                      ).value)
                    }
                  />
                </div>
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
                            <>
                              {' '}
                              <Form
                                action={action}
                                class="suggestions-zip-code"
                              >
                                {' '}
                                <li class="lis-sgrs">
                                  <div class="suge">
                                    <DouveryArrowRigth1 />{' '}
                                    <input
                                      type="text"
                                      id="code"
                                      name="code"
                                      value={suggestion}
                                      readOnly
                                    />
                                  </div>

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
                            </>
                          );
                        })}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
                {user ? '' : <></>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
