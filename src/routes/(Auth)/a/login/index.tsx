import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

import styles from './index.css?inline';
import { saveData } from '~/services/auth/token/token';

export interface Store {
  email: string;
  password: string;
}
export default component$(() => {
  useStylesScoped$(styles);
  const navigate = useNavigate();

  const store = useStore<Store>({
    email: '',
    password: '',
  });

  return (
    <div class="ctr-login">
      <div class={'grid gap-3 p-3'}>
        <label class="label">
          <span class="label-text text-xs font-semibold">EMAIL</span>
        </label>
        <input
          type=""
          class="input input-bordered w-full max-w-xs focus:outline-0 dark:bg-base-300"
          value={store.email}
          onInput$={(event) =>
            (store.email = (event.target as HTMLInputElement).value)
          }
        />
        <br />
        <label class="label">
          <span class="label-text text-xs font-semibold">PASSWORD</span>
        </label>
        <input
          type={'password'}
          class="input input-bordered w-full max-w-xs focus:outline-0 dark:bg-base-300"
          value={store.password}
          onInput$={(event) =>
            (store.password = (event.target as HTMLInputElement).value)
          }
        />
        <label class="label">
          <span class="label-text text-xs font-semibold">
            Need an account?{' '}
            <a href="/register" class="link link-primary">
              Register
            </a>
          </span>
        </label>
        <br />
        <button
          class="btn btn-primary"
          onClick$={async () => {
            try {
              const response = await fetch(
                `https://server-douvery.vercel.app/api/signin`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: store.email,
                    password: store.password,
                  }),
                }
              );

              if (response.status === 400) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.msg);
              }
              const data = await response.json();
              const token = data.token;

              saveData(JSON.stringify(token));
              navigate('/');
            } catch (error: any) {
              console.error(error);
              const errorMessage = document.createElement('div');
              errorMessage.textContent = 'Error: ' + error.message;
            }
          }}
        >
          Log In
        </button>
        <div id="error-message"></div>
      </div>
    </div>
  );
});
