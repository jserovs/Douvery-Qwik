import {
  // Resource,
  component$,
  useSignal,
  // useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './modal-cart.css?inline';

import { fetchCode, fetchIpInfo } from '~/services/fechProduct';
import { globalAction$, z, zod$ } from '@builder.io/qwik-city';
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

import Cart from '~/routes/(Cart)/v/cart';

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

export const ModalCartInfo = component$(() => {
  useStylesScoped$(styles);
  const isOpen = useSignal(true);

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
    <div class="crt-button-modal-dr">
      {isOpen.value && (
        <>
          {' '}
          <div class="crtr-modal" onClick$={() => (isOpen.value = false)}></div>
          <div class="crtr-modal-content">
            <div class={`modal ${!isOpen && 'modal-close'}`}>
              <div class="ctr-title-modal">
                <p>Carrito actualizado con exito.</p>
              </div>{' '}
              <Cart />
            </div>
          </div>
        </>
      )}
    </div>
  );
});
