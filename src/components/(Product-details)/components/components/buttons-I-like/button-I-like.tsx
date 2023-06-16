import {
  $,
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './button-I-like.css?inline';

import { useGetCurrentUser } from '~/routes/layout';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import {
  getProductLikeStatus,
  productUserLikeDislike,
} from '~/services/userlike-dislike/productUserLikeDislike';

export const LikeButtons = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const likeStatus = useStore({ setLikeStatus: null });
  const user = useGetCurrentUser().value;
  const nav = useNavigate();
  const loc = useLocation();

  const handleClick = $(async (like: any) => {
    if (!user) {
      nav('/a/login?rr=' + loc.url.pathname);
      return;
    }
    try {
      const response = await productUserLikeDislike(
        user?.id as any,
        product.dui,
        like
      );
      likeStatus.setLikeStatus = response.likeStatus;
    } catch (error) {
      console.error('Error:', error);
    }
  });

  useVisibleTask$(async ({ track }) => {
    track(() => product.dui || product.name);
    if (!user) {
      return;
    }
    try {
      const response = await getProductLikeStatus(user?.id as any, product.dui);

      likeStatus.setLikeStatus = response.likeStatus;
    } catch (error) {
      console.error('Error:', error);
    }
  });

  return (
    <>
      <div class="review-product">
        <button
          class={`button-helpful ${
            likeStatus.setLikeStatus === true ? 'liked' : ''
          }`}
          onClick$={() => {
            handleClick(true);
          }}
        >
          <svg
            class={`button-helpful ${
              likeStatus.setLikeStatus === true ? 'liked' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
            />
          </svg>
          <p> Me gusta</p>
        </button>

        <button
          class={`button-helpful ${
            likeStatus.setLikeStatus === false ? 'disliked' : ''
          }`}
          onClick$={() => {
            handleClick(false);
          }}
        >
          <svg
            class={`button-helpful ${
              likeStatus.setLikeStatus === false ? 'disliked' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"
            />
          </svg>
          <p>No me gusta</p>
        </button>
      </div>
      {!user && (
        <div class="container-login">
          <p class="ps-sr1">Debes </p>{' '}
          <a href={'/a/login?rr=' + loc.url.pathname}>Iniciar sesión</a>
        </div>
      )}
    </>
  );
});
