import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/auth-login';

import styles from './index.css?inline';
import { DouveryLogo40x40 } from '~/components/icons/logo40x40';
import { urlServerNode } from '~/services/fechProduct';

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
  if (acccessToken) {
    throw redirect(302, '/');
  }
};

export const useRegister = globalAction$(
  async ({ name, lastName, email, password }, { fail, headers, cookie }) => {
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

    // Redirect using location header instead of redirect becuase we need to reload the routeLoader to get the new user data
    headers.set('location', '/');
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
      <div class="md:max-w-md lg:col-span-2 ctr-login-douvery">
        <a
          href="/"
          aria-label="Go home"
          title="Douvery"
          class="inline-flex items-center iteam-douvery"
        >
          <DouveryLogo40x40 color="var(--color-primary)" />
          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Douvery
          </span>
        </a>
      </div>
      <div class="login-container">
        <div class="header-login">
          <div class="title-login">Crea tu cuenta</div>{' '}
          <div class="sub-title-login">de forma segura</div>{' '}
        </div>

        <Form action={action}>
          <div class="FirstAndLastName">
            <div class="div-name">
              <label for="name">Nombre</label>
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
              <label for="name">Apellido</label>
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
        <div class="terms-and-conditions">
          <p>
            Al Registrarte, acepta nuestros{' '}
            <a href="#">Términos y condiciones</a>.
          </p>
        </div>
      </div>
    </div>
  );
});
