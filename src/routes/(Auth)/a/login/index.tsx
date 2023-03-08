import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import styles from './index.css?inline';

import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/auth-login';
import { urlServerNode } from '~/services/fechProduct';
import { DouveryLogo40x40 } from '~/components/icons/logo40x40';

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
        message: 'Invalid email or password',
      });
    }

    setCookiesData(dataAccess, cookie);

    headers.set('location', '/');
  },
  zod$({
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
      }),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLogin();

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
            NEED AN ACCOUNT?
            <a href="#" class="forgot-new-account-link">
              REGISTER
            </a>
          </div>
        </Form>
        <div class="terms-and-conditions">
          <p>
            By logging in, you agree to our <a href="#">Terms and Conditions</a>
            .
          </p>
        </div>
      </div>
    </div>
  );
});
