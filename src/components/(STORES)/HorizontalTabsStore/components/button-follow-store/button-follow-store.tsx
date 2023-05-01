import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-follow-store.css?inline';
import { globalAction$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';
import { urlServerNode } from '~/services/fechProduct';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';

export const useSubmit = globalAction$(
  async ({ ospayneId, userId }, { fail, cookie }) => {
    const serverUrl = `${urlServerNode}/api/user/follow/store`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);
    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
      body: JSON.stringify({
        ospayneId: ospayneId,
        userId: userId,
      }),
    });
    const response = await res.json();

    if (res.status !== 200) {
      const errorMessage =
        response.nouser || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }
    return response;
  }
);

export const ButtonFollowStore = component$(({ followers }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const loc = useLocation();
  const user = useGetCurrentUser().value;
  const action = useSubmit();
  const handleFollow = $(async () => {
    if (!user) {
      nav('/a/login/' + '?rr=' + loc.url.pathname, true);
      return;
    }
    const { value } = await action.submit({
      ospayneId: loc.params.id,
      userId: user?.id,
    });

    followers.value = value.followers;
  });

  return (
    <div class="container-all">
      {action.isRunning ? (
        <span class="loa-s">Verifying...</span>
      ) : (
        <>
          <span class="error ">{action.value?.message}</span>
        </>
      )}
      <button onClick$={handleFollow} class="button-follow-store">
        Follow
      </button>{' '}
    </div>
  );
});
