import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-delete-address.css?inline';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { urlServerNode } from '~/services/fechProduct';

export const useSubmit = globalAction$(
  async ({ password }, { fail, cookie, params, redirect }) => {
    const serverUrl = `${urlServerNode}/api/delete-user-address`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        password: password,
        userId: user.id,
        index: params.index,
      }),
    });

    const response = await res.json();

    // Verificar el estado de la respuesta HTTP en lugar de 'response.ok'
    if (res.status !== 200) {
      // Utilizar el mensaje de error proporcionado por la API si está disponible
      const errorMessage =
        response.error || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }

    if (response.success) {
      setCookiesData(response.userData, cookie);
      throw redirect(302, '/a/user/verified-segure/changes/address-delivery/');
    } else {
      throw new Error('Error');
    }
  },

  zod$({
    password: z.string({
      required_error: 'Password is required',
    }),
  })
);
export const ButtonDeleteAddress = component$(() => {
  useStylesScoped$(styles);
  const isOpen = useSignal(false);
  const action = useSubmit();
  return (
    <div class=" container-all">
      {' '}
      <div class="container-title">
        <p> Deseas eleminar esta dirección?</p>
        <div
          onClick$={() => (isOpen.value = true)}
          class="button-address-delete"
        >
          <strong> Delete address</strong>
        </div>
      </div>
      {isOpen.value && (
        <>
          <div
            class="container-down-modal"
            onClick$={() => (isOpen.value = false)}
          ></div>
          <div class="modal">
            <Form action={action}>
              {' '}
              <h2>Confirmar eliminación</h2>
              <p>¿Estás seguro de que deseas eliminar esta dirección?</p>
              <div class="container-inputs-password">
                {action.value?.message && (
                  <div>
                    {' '}
                    <br />
                    {action.isRunning ? (
                      <span class="loa-s">Verifying...</span>
                    ) : (
                      <span class="error ">{action.value?.message}</span>
                    )}
                    <div class="form-group need-account">
                      ¿Crees que presenta un error de parte de douvery?
                      <a href="/a/" class="forgot-new-account-link">
                        Reportar
                      </a>
                    </div>{' '}
                    <br />
                  </div>
                )}

                <label for="name" class="form__label">
                  {' '}
                  You password{' '}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="You password"
                  required
                />
                {action.value?.fieldErrors?.password && (
                  <span class="error">
                    {action.value?.fieldErrors?.password}
                  </span>
                )}
              </div>
              <button type="submit" class="button-address-new">
                {action.isRunning
                  ? 'Loading...'
                  : action.value?.message
                  ? 'Error'
                  : 'Delete address'}
              </button>
              <div class="separator">
                <hr class="line" />
                <p>Or</p>
                <hr class="line" />
              </div>
            </Form>
            <button
              type="submit"
              class="button-cancel"
              onClick$={() => (isOpen.value = false)}
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
});
