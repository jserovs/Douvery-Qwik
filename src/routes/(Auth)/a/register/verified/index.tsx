import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

import styles from './index.css?inline';

import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/login';
import { urlServerNode } from '~/services/fechProduct';

import { DouveryAuthLogo } from '~/components/(Auth)/DouveryAuthLogo/douvery-auth-logo';
import { TermsConditions } from '~/components/(Auth)/Terms&Conditions/terms-Conditions';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { useGetCurrentUser } from '~/routes/layout';

export interface Store {
  email: string;
  password: string;
}

export const useLogin = globalAction$(
  async ({ code }, { fail, cookie, headers }) => {
    const serverUrl = `${urlServerNode}`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);
    const response = await fetch(`${serverUrl}/api/signup/verified`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        userId: user.id,
        code: code,
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
    code: z.string({
      required_error: 'Code verification is required',
    }),
  })
);

export default component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;
  const action = useLogin();

  return (
    <div class="ctr-login">
      {' '}
      <DouveryAuthLogo />
      <div class="login-container">
        <div class="header-login">
          <div class="title-login">Activacte you account</div>
          <br />
          <br />
          <div class="sub-title-login">
            {' '}
            A verification code was sent to{'  '}
            <strong>{user?.email}</strong>
          </div>{' '}
        </div>
        <br />
        <Form action={action}>
          <div class="form-group">
            <label for="email">Code verification</label>
            <input type="text" id="code" name="code" required />
            {action.value?.fieldErrors?.code && (
              <span class="error">{action.value?.fieldErrors?.code}</span>
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
                  : 'Verify'}
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
export const head: DocumentHead = {
  title: 'Account verification | Douvery',
  meta: [
    {
      name: 'Account verification | Douvery',
      content: 'Account verification | Douvery',
    },
  ],
};
