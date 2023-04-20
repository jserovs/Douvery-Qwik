import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import {
  Form,
  Link,
  globalAction$,
  useLocation,
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
import { useGetCurrentUser } from '~/routes/layout';

import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
import { fetchIndexPhonesUser } from '~/services/user/phones/phones';
import { ButtonDeletePhone } from '~/components/(Account)/User/verified-segure/changes/my-phone/edit/button-delete-phone';

export const useSubmit = globalAction$(
  async ({ password, number }, { fail, cookie, params, redirect }) => {
    const serverUrl = `${urlServerNode}/api/update-user-phone`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },

      body: JSON.stringify({
        password: password,
        userId: user.id,
        index: params.index,
        newNumber: number,
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
      .max(25, 'upps! Your number is too long')
      .nonempty('Full number is required'),

    password: z.string({
      required_error: 'Password is required',
    }),
    confirm: z.string({
      required_error: 'Confirm is required',
    }),
  })
);
export default component$(() => {
  useStylesScoped$(styles);
  const action = useSubmit();
  const loc = useLocation();
  const nav = useNavigate();
  const userACC = useGetCurrentUser().value;

  const state = useStore<{
    phone: [];
  }>(
    {
      phone: [],
    },
    { recursive: true }
  );

  const phonesResource = useResource$<void>(async ({ track }) => {
    track(() => loc.params.index);
    const data = await fetchIndexPhonesUser(
      `${userACC?.token}`,
      `${userACC?.id}`,
      loc.params.index
    );
    state.phone = data;
  });
  const isPrimary = useStore({ setIsPrimary: false });

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
          <p>Change your phone</p>
        </div>
        <h6>Personal Information</h6>
      </div>
      <Form class="form" action={action}>
        <Resource
          value={phonesResource}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <>
              <div>
                <label for="number">Phone number</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  required
                  value={state.phone}
                />
                {action.value?.fieldErrors?.number && (
                  <span class="error">{action.value?.fieldErrors?.number}</span>
                )}
              </div>
              <div class="container-button-send">
                <div class="checkbox-wrapper-42">
                  <input
                    type="checkbox"
                    id="confirm"
                    name="confirm"
                    onClick$={() =>
                      (isPrimary.setIsPrimary = !isPrimary.setIsPrimary)
                    }
                  />

                  <label class="cbx" for="confirm"></label>
                  <label class="lbl" for="confirm">
                    Confirmo este cambio.{' '}
                  </label>
                  {action.value?.fieldErrors?.confirm && (
                    <span class="error">
                      {action.value?.fieldErrors?.confirm}
                    </span>
                  )}
                </div>

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
                    : 'Modify address'}
                </button>
                <div class="separator">
                  <hr class="line" />
                  <p>Or</p>
                  <hr class="line" />
                </div>
                <div class="container-link-create">
                  <Link href="/a/user/verified-segure/changes/address-delivery/new-address/">
                    Create new address
                  </Link>
                </div>
              </div>
            </>
          )}
        />
      </Form>
      <div class="separator">
        <hr class="line" />
        <p>Delete phone</p>
        <hr class="line" />
      </div>
      <ButtonDeletePhone />
    </div>
  );
});
