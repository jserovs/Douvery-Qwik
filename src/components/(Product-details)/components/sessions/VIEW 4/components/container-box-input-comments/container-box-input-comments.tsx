import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import style from './container-box-input-comments.css?inline';
import { ContainerBoxBser } from '../container-box-user/container-box-user';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { urlServerNode } from '~/services/fechProduct';

export const useSubmit = globalAction$(
  async (
    { title_comment, text_comment, ratings, file },
    { fail, cookie, redirect, params, url }
  ) => {
    const serverUrl = `${urlServerNode}/api/new/review-product`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);
    const formData = new FormData();
    formData.append('productDui', params.dui);
    formData.append('buyerId', user.id);
    formData.append('title', title_comment);
    formData.append('review', text_comment);
    formData.append('rating', ratings);
    formData.append('photos', file);

    const res = await fetch(serverUrl, {
      body: formData,
      headers: {
        'x-auth-token': user.token,
      },
      method: 'post',
    });

    const uploadResult = await res.json();

    if (!uploadResult.ok) {
      return fail(401, {
        message: 'Invalid review title, text comment or rating.',
      });
    }

    if (res.status !== 200) {
      const errorMessage =
        uploadResult.error ||
        uploadResult.msg ||
        'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }
    if (uploadResult.success) {
      const query =
        url.origin + '/v/' + params.slug + '/' + params.dui + '/' + '#REVIEWS';

      throw redirect(302, query);
    } else {
      throw new Error('Error al subir la imagen al servidor');
    }
  },

  zod$({
    title_comment: z.string({
      required_error: 'Review title is required',
    }),
    text_comment: z.string({
      required_error: 'The opinion text is required',
    }),
    ratings: z.string({
      required_error: 'The rating is required',
    }),
    file: z.instanceof(Blob),
  })
);

export const ContainerBoxInputComments = component$(({ datePurchase }: any) => {
  useStylesScoped$(style);

  const preview = useSignal([]);
  const handleFileChange = $((event: any) => {
    const files = event.target.files;
    if (files) {
      preview.value = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          preview.value.push(reader.result as never);
        };
        reader.readAsDataURL(file);
      }
    } else {
      preview.value = ['Error fatal' as never];
    }
  });
  const action = useSubmit();

  return (
    <div class="comments-box">
      <Form action={action}>
        <div>
          <label for="comentario">Comentario:</label>
          <ContainerBoxBser datePurchase={datePurchase} />
          {action.value?.fieldErrors?.ratings && (
            <span class="error">{action.value?.fieldErrors?.ratings}</span>
          )}
          <div class="container-input-title">
            <label for="title_comment">Title:</label>
            <input
              type="text"
              id="title_comment"
              name="title_comment"
              placeholder="Title comments"
            />
          </div>
          {action.value?.fieldErrors?.title_comment && (
            <span class="error">
              {action.value?.fieldErrors?.title_comment}
            </span>
          )}
          <textarea
            id="text_comment"
            name="text_comment"
            aria-label="Comentario"
            placeholder="Escribe un comentario..."
            rows={3}
            cols={60}
          />
          {action.value?.fieldErrors?.text_comment && (
            <span class="error">{action.value?.fieldErrors?.text_comment}</span>
          )}
          <br></br>
          {preview.value && (
            <div class="container-img-preview">
              {preview.value.map((image: string, i) => (
                <div class="img-preview" key={i}>
                  <img src={image} alt="" />
                </div>
              ))}
              <br></br>
            </div>
          )}

          <div class="ctr-butr">
            <input
              accept="image/*"
              type="file"
              id="file"
              name="file"
              onChange$={handleFileChange}
              multiple
            />
            <p class="ps-sr1">
              Al comentar, acepto los términos de comentarios.
            </p>
            <button type="submit" class="send-button">
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

        {action.value?.failed && (
          <p>{action.value.fieldErrors?.text_comment}</p>
        )}
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
      </Form>
    </div>
  );
});
