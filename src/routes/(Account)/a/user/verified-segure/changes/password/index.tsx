import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import {
  type DocumentHead,
  Form,
  globalAction$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { urlServerNode } from '~/services/fechProduct';
import { ModalCodeEMAIL } from '~/components/(Account)/User/verified-segure/changes/password/modal-code-email';

export const useSubmit = globalAction$(
  async ({ password }, { fail, cookie }) => {
    const serverUrl = `${urlServerNode}/api/user/send-verification-code`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
      body: JSON.stringify({
        password: password,
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
  },

  zod$({
    newpassword: z.string({
      required_error: 'Password is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
);
export default component$(() => {
  useStylesScoped$(styles);
  const action = useSubmit();
  const isPrimary = useStore({ setIsPrimary: false });
  const password = useSignal('');
  const newpassword = useSignal('');

  return (
    <div class="container-all">
      {' '}
      <div class="container-title">
        <p>Change your email</p>
        <h6>Personal Information</h6>
      </div>
      <Form class="form" action={action}>
        <div class="container-form">
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
                  onChange$={(e) => (newpassword.value = e.target.value)}
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
                onChange$={(e) => (password.value = e.target.value)}
              />
              {action.value?.fieldErrors?.password && (
                <span class="error">{action.value?.fieldErrors?.password}</span>
              )}
            </div>
          </div>
          <div>
            {' '}
            <div class="checkbox-wrapper-42">
              <input
                type="checkbox"
                id="confirm"
                name="confirm"
                required
                onClick$={() =>
                  (isPrimary.setIsPrimary = !isPrimary.setIsPrimary)
                }
              />

              <label class="cbx" for="confirm"></label>
              <label class="lbl" for="confirm">
                Confirmo este cambio.{' '}
              </label>
            </div>
            {action.status === 200 && (
              <ModalCodeEMAIL
                password={password.value}
                newpassword={newpassword.value}
                isConfirm={isPrimary.setIsPrimary}
              />
            )}
            <div class="container-form-button">
              <button>{action.isRunning ? 'Loading...' : 'Change'}</button>
            </div>
            <p> </p>
            {action.value?.message && (
              <div>
                {' '}
                <br />
                {action.isRunning ? (
                  <span class="loa-s">Verifying...</span>
                ) : (
                  <span class="error ">{action.value?.message}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Douvery - Cambiar de contraseña',
  meta: [
    {
      name: 'Douvery - Cambiar de contraseña',
      content: 'Douvery - Cambiar de contraseña',
    },
  ],
};
