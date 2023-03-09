import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import styles from './index.css?inline';

import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/auth-login';
import { urlServerNode } from '~/services/fechProduct';

import { TermsConditions } from '~/components/(Auth)/Terms&Conditions/terms-Conditions';
import { DouveryAuthLogo } from '~/components/(Auth)/DouveryAuthLogo/douvery-auth-logo';

export interface Store {
  email: string;
  password: string;
}
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (acccessToken) {
    throw redirect(302, '/');
  }
};

export const useLogin = globalAction$(
  async ({ email, password }, { fail, cookie, headers }) => {
    const response = await fetch(`${urlServerNode}/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const dataAccess = await response.text();

    if (!response.ok) {
      return fail(401, {
        message: 'Email o password no válidos',
      });
    }

    setCookiesData(dataAccess, cookie);

    headers.set('location', '/');
  },
  zod$({
    email: z
      .string({
        required_error: 'Email requerido',
      })
      .email({
        message: 'Please enter a valid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLogin();

  return (
    <div class="ctr-login">
      {' '}
      <DouveryAuthLogo />
      <div class="login-container">
        <div class="header-login">
          <div class="title-login">Accede a tu cuenta</div>{' '}
          <div class="sub-title-login">Inicia session de forma segura</div>{' '}
        </div>

        <Form action={action}>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
            {action.value?.fieldErrors?.email && (
              <span class="error">{action.value?.fieldErrors?.email}</span>
            )}
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
            {action.value?.fieldErrors?.password && (
              <span class="error">{action.value?.fieldErrors?.password}</span>
            )}
          </div>

          {action.value?.message && (
            <div>
              {' '}
              <br />
              {action.isRunning ? (
                <span class="loa-s">Loading...</span>
              ) : (
                <span class="error ">{action.value?.message}</span>
              )}
              <div class="form-group need-account">
                ¿Olvidaste la constraseña?
                <a href="/a/recover-account" class="forgot-new-account-link">
                  Recuperar
                </a>
              </div>{' '}
              <br />
            </div>
          )}

          <div class="form-group">
            <button class={'login-button'}>
              <span class="button-text">
                {action.isRunning
                  ? 'Loading...'
                  : action.value?.message
                  ? 'Error'
                  : 'Log in'}
              </span>
            </button>
          </div>
          <div class="form-group need-account">
            ¿No tiene una cuenta?
            <a href="/a/register" class="forgot-new-account-link">
              Crear una
            </a>
          </div>
        </Form>
        <TermsConditions />
      </div>
    </div>
  );
});
export const head: DocumentHead = {
  title: 'Inicar Session en Douvery',
  meta: [
    {
      name: 'description',
      content: 'Inicar Session en Douvery',
    },
  ],
};
