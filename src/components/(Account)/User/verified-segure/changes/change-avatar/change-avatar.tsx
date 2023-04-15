import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './change-avatar.css?inline';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import {
  DATA_ACCESS_COOKIE_NAME,
  setCookiesData,
} from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';
import { useGetCurrentUser } from '~/routes/layout';

export const useSubmit = globalAction$(
  async ({ file }, { cookie, url, redirect }) => {
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
      setCookiesData(uploadResult.userData, cookie);
      throw redirect(302, url.pathname);
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
  const userACC = useGetCurrentUser().value;
  const preview = useSignal('');
  const handleFileChange = $((event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        preview.value = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      preview.value = 'Error fatal';
    }
  });
  return (
    <div class="container-box-avatar">
      <div class="box">
        <img
          src={
            userACC?.avatar
              ? userACC?.avatar
              : 'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
          }
          alt="avatar"
        />
        <p>Sube o cambia tu imagen de perfil.</p>

        <div class="container-button-change-avatar">
          <Form action={action}>
            <input
              accept="image/*"
              type="file"
              id="file"
              name="file"
              onChange$={handleFileChange}
            />
            <button>
              {' '}
              {action.isRunning ? <div class="loader"></div> : 'Change Avatar'}
            </button>
          </Form>
        </div>
      </div>
      {preview.value && (
        <div class="avatar-preview">
          <img src={preview.value} alt="avatar preview" />
          <p>{userACC?.name}</p>
        </div>
      )}
    </div>
  );
});
