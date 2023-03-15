import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/login';

import styles from './index.css?inline';

import { urlServerNode } from '~/services/fechProduct';
import { TermsConditions } from '~/components/(Auth)/Terms&Conditions/terms-Conditions';
import { DouveryAuthLogo } from '~/components/(Auth)/DouveryAuthLogo/douvery-auth-logo';

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (acccessToken) {
    throw redirect(302, '/');
  }
};

export const useRegister = globalAction$(
  async ({ name, lastName, email, password }, { fail, headers, cookie,url }) => {
    const data = await fetch(`${urlServerNode}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        receiveGmail: false,
      }),
    });

    const dataAccess = await data.json();

    if (!data.ok || !dataAccess) {
      const errorMessage = 'Something went wrong. Please try again later.';
      console.error('Error:', errorMessage); // log the error to the console for debugging
      return fail(400, {
        message: errorMessage,
      });
    }

    setCookiesData(dataAccess, cookie);

    const query = url.searchParams.get('rr') || '';
    headers.set('location', query);
   
  },
  zod$({
    name: z
      .string({
        required_error: 'Full name is required',
      })
      .min(4, {
        message: 'Upps! Your name is too short',
      })
      .max(15, {
        message: 'upps! Your name is too long',
      }),
    lastName: z
      .string({
        required_error: 'Full name is required',
      })
      .min(5, {
        message: 'Upps! Your name is too short',
      })
      .max(25, {
        message: 'upps! Your name is too long',
      }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Please enter a valid email',
      }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .max(25, {
        message: 'Password must be less than 25 characters',
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message:
          'Password must contain at least six characters, including at least 1 letter and 1 number',
      }),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useRegister();

  return (
    <div class="ctr-login">
      {' '}
      <DouveryAuthLogo />
      <div class="login-container">
        <div class="header-login">
          <div class="title-login">Crea tu cuenta</div>{' '}
          <div class="sub-title-login">de forma segura</div>{' '}
        </div>

        <Form action={action}>
          <div class="FirstAndLastName">
            <div class="div-name">
              <label for="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="on"
              />
              {action.value?.fieldErrors?.name && (
                <span class="error">{action.value?.fieldErrors?.name}</span>
              )}
            </div>
            <div class="div-lastName">
              <label for="name">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                autoComplete="on"
              />{' '}
              {action.value?.fieldErrors?.lastName && (
                <span class="error">{action.value?.fieldErrors?.lastName}</span>
              )}
            </div>
          </div>
          <br />
          <div class="form-group">
            <label for="email">Email de preferencia</label>
            <input type="email" id="email" name="email" required />
            {action.value?.fieldErrors?.email && (
              <span class="error">{action.value?.fieldErrors?.email}</span>
            )}
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type={'password'}
              id="password"
              name="password"
              required
              autoComplete="on"
            />
          </div>
          <div class="form-group">
            <label for="receiveGmail" class="receiveGmail">
              <input type="checkbox" id="receiveGmail" name="receiveGmail" />
              Recibir alerta de inicio de sesión.
            </label>
          </div>

          {action.value?.message && (
            <span class="error">{action.value?.message}</span>
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
            ¿Ya tiene una cuenta?
            <a href="/a/login" class="forgot-new-account-link">
              Iniciar sesión
            </a>
          </div>
        </Form>
        <TermsConditions />
      </div>
    </div>
  );
});
