import styles from './comment-reply.css?inline';

import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

import { globalAction$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { urlServerLocal } from '~/services/fechProduct';
import { BoxUser } from './box-user/box-user';
import { useGetCurrentUser } from '~/routes/layout';

export const useSubmit = globalAction$(
  async (
    { text_comment, reviewId },
    { fail, cookie, redirect, params, url }
  ) => {
    const serverUrl = `${urlServerLocal}/api/new/review/comment`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
      body: JSON.stringify({
        reviewId: reviewId,
        authorId: user.id,
        content: text_comment,
      }),
    });

    const uploadResult = await res.json();

    // Verificar el estado de la respuesta HTTP en lugar de 'response.ok'
    if (res.status !== 200) {
      // Utilizar el mensaje de error proporcionado por la API si está disponible
      const errorMessage =
        uploadResult.error ||
        uploadResult.msg ||
        'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }
    if (uploadResult.success) {
      const customId = '#' + 'review-' + reviewId;
      const query =
        url.origin + '/v/' + params.slug + '/' + params.dui + '/' + customId;

      throw redirect(302, query);
    } else {
      throw new Error('Error al subir la imagen al servidor');
    }
  }
);

export const CommentReply = component$(({ id, datePurchase }: any) => {
  useStylesScoped$(styles);
  const text_comment = useSignal('');
  const action = useSubmit();
  const nav = useNavigate();
  const loc = useLocation();
  const user = useGetCurrentUser().value;
  const handleSubmit = $(async () => {
    if (!user) {
      nav('/a/login/' + '?rr=' + loc.url.pathname, true);
      return;
    }
    const { value } = await action.submit({
      reviewId: id,
      text_comment: text_comment.value,
    });
    console.log(value);
  });

  return (
    <div class="comments-box">
      <div></div>

      <div>
        <BoxUser datePurchase={datePurchase} />

        <textarea
          id="text_comment"
          name="text_comment"
          aria-label="Comentario"
          placeholder="Escribe un comentario..."
          onchange$={(e: any) => {
            text_comment.value = e.target.value;
          }}
          rows={3}
          cols={60}
        />
        <br />
        <div class="ctr-butr">
          <p class="ps-sr1">Al comentar, acepto los términos de comentarios.</p>
          <button onClick$={handleSubmit} class="send-button">
            {' '}
            Enviar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M1.203 1.043a.5.5 0 0 0-.635.709L3.921 7.5L.568 13.248a.5.5 0 0 0 .635.709l13.5-6a.5.5 0 0 0 0-.914l-13.5-6ZM4.846 7.1L2.212 2.586L13.27 7.5L2.212 12.414L4.846 7.9H9a.4.4 0 1 0 0-.8H4.846Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

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
  );
});
