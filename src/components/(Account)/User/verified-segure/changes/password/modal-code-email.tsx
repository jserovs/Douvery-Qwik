import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './modal-code-email.css?inline';
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
import { useGetCurrentUser } from '~/routes/layout';

export const useSubmit = globalAction$(
  async ({ codeEmail, newpassword, password }, { fail, cookie, redirect }) => {
    const serverUrl = `${urlServerNode}/api/user/verify-code-and-change-password`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        oldPassword: password,
        newPassword: newpassword,
        verificationCode: codeEmail,
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
      throw redirect(302, '/a/user/profile/' + user.name);
    } else {
      throw new Error('Error');
    }
  },

  zod$({
    newpassword: z.string({
      required_error: 'Password is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    codeEmail: z.string({
      required_error: 'code is required',
    }),
  })
);
export const ModalCodeEMAIL = component$(
  ({ password, newpassword, isConfirm }: any) => {
    useStylesScoped$(styles);
    const isOpen = useSignal(true);
    const action = useSubmit();
    const userAcc = useGetCurrentUser().value;

    return (
      <div class=" container-all">
        {' '}
        {isOpen.value && (
          <>
            <div
              class="container-down-modal"
              onClick$={() => (isOpen.value = false)}
            ></div>
            <div class="modal">
              <Form action={action}>
                {' '}
                <div class="container-no-view-user">
                  <div>
                    {' '}
                    <div class="container-inputs">
                      <div>
                        <label for="newpassword" class="form__label">
                          {' '}
                          New password{' '}
                        </label>
                        <input
                          type="text"
                          name="newpassword"
                          id="newpassword"
                          placeholder="New new password"
                          value={newpassword}
                        />
                      </div>
                    </div>
                    <div class="separator">
                      <hr class="line" />
                      <p>For segurity</p>
                      <hr class="line" />
                    </div>
                    <div class="container-inputs-password">
                      <label for="name" class="form__label">
                        {' '}
                        Password{' '}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your password"
                        required
                        value={password}
                      />
                      {action.value?.fieldErrors?.password && (
                        <span class="error">
                          {action.value?.fieldErrors?.password}
                        </span>
                      )}
                    </div>
                    <div class="checkbox-wrapper-42">
                      <input
                        type="checkbox"
                        id="confirm"
                        name="confirm"
                        value={isConfirm}
                      />

                      <label class="cbx" for="confirm"></label>
                      <label class="lbl" for="confirm">
                        Confirmo este cambio.{' '}
                      </label>
                    </div>
                  </div>
                  <div></div>
                </div>
                <h2>Ingrese el código de verificación</h2>
                <div class="container-email">
                  <hr class="line" />
                  <p>
                    Se te envio un codigo de verificacion a{'  '}
                    <strong>{userAcc?.email}</strong>
                  </p>
                  <hr class="line" />
                </div>
                <div class="container-inputs-password">
                  <label for="name" class="form__label">
                    {' '}
                    Code verificaction{' '}
                  </label>
                  <input
                    type="text"
                    name="codeEmail"
                    id="codeEmail"
                    placeholder="You code verificaction"
                    required
                  />
                </div>
                <button type="submit" class="button-address-new">
                  {action.isRunning
                    ? 'Loading...'
                    : action.value?.message
                    ? 'Error'
                    : 'Continue'}
                </button>
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
                <div class="separator">
                  <hr class="line" />
                  <p>Or</p>
                  <hr class="line" />
                </div>
                {action.value?.fieldErrors?.password && (
                  <span class="error">
                    {action.value?.fieldErrors?.password}
                  </span>
                )}
                {action.value?.fieldErrors?.codeEmail && (
                  <span class="error">
                    {action.value?.fieldErrors?.codeEmail}
                  </span>
                )}
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
  }
);
