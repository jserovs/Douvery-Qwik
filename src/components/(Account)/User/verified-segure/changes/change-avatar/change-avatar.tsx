import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './change-avatar.css?inline';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';

export const useSubmit = globalAction$(
  async ({ file }, { cookie }) => {
    const serverUrl = 'https://server-douvery.vercel.app/api/user/add-avatar';
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(serverUrl, {
      body: formData,
      headers: {
        'x-auth-token': user.token,
      },
      method: 'post',
    });

    const uploadResult = await res.json();

    if (uploadResult.success) {
      return {
        message: uploadResult.message,
      };
    } else {
      throw new Error('Error al subir la imagen al servidor');
    }
  },

  zod$({
    file: z.instanceof(Blob),
  })
);

export const ChangeAvatar = component$(() => {
  useStylesScoped$(styles);
  // const nav = useNavigate();
  const action = useSubmit();
  const fileRef = useSignal<HTMLInputElement>();
  const store = useStore({
    count: 0,
  });
  const task = useStore({
    nav: false,
  });

  useVisibleTask$(({ track }) => {
    track(() => (task.nav = true));
    const timer = setInterval(() => {
      store.count++;
    }, 500);

    return () => {
      action.value?.message;
      clearInterval(timer);
    };
  });
  // if (store.count === 10) {
  //   nav('/otro-componente');
  // }
  return (
    <div class="container-box-avatar">
      <div>
        <img
          src={
            'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
          }
          alt="avatar"
        />
        <p>Cambiada por ultima vez el 7 de abril de 2022</p>
        {store.count}
        <div class="container-button-change-avatar">
          <Form action={action}>
            <input
              accept="image/*"
              ref={fileRef}
              type="file"
              id="file"
              name="file"
            />
            <button onClick$={() => fileRef.value?.click()}>
              Change Avatar
            </button>
          </Form>
        </div>
        <p>
          {action.value?.message && (
            <>
              <p class="success-message">{action.value?.message}</p>
              <p>
                Por motivo de seguridad debe iniar session nuevamente para
                reflejar cambios.
              </p>
            </>
          )}{' '}
        </p>
      </div>
    </div>
  );
});
