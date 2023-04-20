import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import {
  Form,
  globalAction$,
  useNavigate,
  z,
  zod$,
} from '@builder.io/qwik-city';
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

import { DouveryLeft3 } from '~/components/icons/arrow-left-3';

export const useSubmit = globalAction$(
  async ({ number }, { fail, cookie, redirect }) => {
    const serverUrl = `${urlServerNode}/api/new/phone-user`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        userId: user.id,
        phone: number,
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
      throw redirect(302, '/a/user/verified-segure/changes/my-phone/');
    } else {
      throw new Error('Error');
    }
  },

  zod$({
    number: z
      .string()
      .min(4, 'Upps! Your number is too short')
      .max(15, 'upps! Your number is too long')
      .nonempty('Full number is required'),
  })
);
export default component$(() => {
  useStylesScoped$(styles);
  const action = useSubmit();

  const nav = useNavigate();

  return (
    <div class="container-all">
      {' '}
      <div
        class="container-ret"
        onClick$={() => nav('/a/user/verified-segure/changes/my-phone/')}
      >
        <DouveryLeft3 size="15" />
        <p>Volver</p>
      </div>
      <div class="container-title">
        <div>
          <p>Create new phone number</p>
        </div>
      </div>
      <Form class="form" action={action}>
        <div>
          <label for="number">You phone number</label>
          <input type="tel" id="number" name="number" required />
          {action.value?.fieldErrors?.number && (
            <span class="error">{action.value?.fieldErrors?.number}</span>
          )}
        </div>
        <div class="container-button-send">
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
                  ¿Crees que presenta un error al crear?
                  <a href="/a/" class="forgot-new-account-link">
                    Reportar
                  </a>
                </div>{' '}
                <br />
              </div>
            )}
            {action.isRunning && (
              <span class="error">{action.value?.fieldErrors?.number}</span>
            )}
          </div>
          <button type="submit" class="button-address-new">
            {action.isRunning
              ? 'Loading...'
              : action.value?.message
              ? 'Error'
              : 'Create phone number'}
          </button>
        </div>
      </Form>
    </div>
  );
});
