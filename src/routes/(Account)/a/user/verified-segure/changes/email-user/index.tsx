import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
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
  async ({ email, password }, { fail, cookie, redirect }) => {
    const serverUrl = `${urlServerNode}/user/email/edit-user`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
      body: JSON.stringify({
        userEmail: email,
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

    if (response.success) {
      setCookiesData(response.userData, cookie);
      throw redirect(302, '/a/user/profile/' + user.name);
    } else {
      throw new Error('Error');
    }
  },

  zod$({
    email: z.string({}),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
);
export default component$(() => {
  useStylesScoped$(styles);
  const action = useSubmit();
  return (
    <div class="container-all">
      {' '}
      <div class="container-title">
        <p>Change your email</p>
        <h6>Personal Information</h6>
      </div>
      <Form class="form" action={action}>
        <div class="container-form">
          <div class="container-inputs">
            <div>
              <label for="email" class="form__label">
                {' '}
                Email{' '}
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="New email"
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
              You password{' '}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              required
            />
            {action.value?.fieldErrors?.password && (
              <span class="error">{action.value?.fieldErrors?.password}</span>
            )}
          </div>
          <div class="container-form-button">
            {action.isRunning ? <div class="loader"></div> : null}
            <button>{action.isRunning ? 'Loading...' : 'Change'}</button>
          </div>
          <p class="alert-segurity">
            Para mas seguridad activa <strong>Session verification.</strong>
          </p>
          <p class="alert-segurity">
            Para mas seguridad activa <strong>Pin segurity.</strong>
          </p>
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
      </Form>
    </div>
  );
});
