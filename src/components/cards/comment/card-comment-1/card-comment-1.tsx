import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './card-comment-1.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';

import { UseDropdownReport } from '~/components/use/dropdownReport/dropdownReport';

import { formatDate } from '~/services/fuction';
import { urlServerNode } from '~/services/fechProduct';
import { globalAction$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';

export const useSubmit = globalAction$(
  async ({ reviewId, userId, review }, { fail }) => {
    const serverUrl = `${urlServerNode}/api/review/helpful-or-no`;

    const res = await fetch(serverUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewId: reviewId,
        userId: userId,
        helpful: review,
      }),
    });
    const response = await res.json();

    // Verificar el estado de la respuesta HTTP en lugar de 'response.ok'
    if (res.status !== 200) {
      // Utilizar el mensaje de error proporcionado por la API si está disponible
      const errorMessage =
        response.nouser || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }
    return response.review;
  }
);

export const CardComment1 = component$(
  ({
    id,
    buyTime,
    avatar,
    name,
    rating,
    title,
    comment,
    timePublic,
    images,
    helpful,
    notHelpful,
  }: any) => {
    useStylesScoped$(style);
    const showAllImg = useStore({ setShowAllImg: false });
    let ratingText;
    switch (rating) {
      case 1:
        ratingText = 'Muy Malo';
        break;
      case 2:
        ratingText = 'Malo';
        break;
      case 3:
        ratingText = 'Regular';
        break;
      case 4:
        ratingText = 'Bueno';
        break;
      case 5:
        ratingText = 'Excelente';
        break;
    }
    const loc = useLocation();
    const nav = useNavigate();
    const action = useSubmit();
    const user = useGetCurrentUser().value;
    const glbhelpfulReview = useSignal(helpful.users);
    const glbnohelpfulReview = useSignal(notHelpful.users);

    const helpfulReview = useSignal(helpful.count);
    const nohelpfulReview = useSignal(notHelpful.count);

    const currentUserHelpful =
      user?.id && glbhelpfulReview.value.includes(user.id);
    const currentUserNoHelpful =
      user?.id && glbnohelpfulReview.value.includes(user.id);

    const handleHelpful = $(async () => {
      if (!user) {
        nav('/a/login/' + '?rr=' + loc.url.pathname, true);
        return;
      }
      const { value } = await action.submit({
        reviewId: id,
        userId: user?.id,
        review: true,
      });
      glbhelpfulReview.value = value.helpful.users;
      glbnohelpfulReview.value = value.notHelpful.users;
      helpfulReview.value = value.helpful.count;
      nohelpfulReview.value = value.notHelpful.count;
    });
    const handleNOHelpful = $(async () => {
      if (!user) {
        nav('/a/login/' + '?rr=' + loc.url.pathname, true);
        return;
      }
      const { value } = await action.submit({
        reviewId: id,
        userId: user?.id,
        review: false,
      });
      glbnohelpfulReview.value = value.notHelpful.users;
      glbhelpfulReview.value = value.helpful.users;
      nohelpfulReview.value = value.notHelpful.count;
      helpfulReview.value = value.helpful.count;
    });
    return (
      <div class="container-all">
        <div class="ctr-box-user">
          <img
            class="crtr-avatar"
            src={
              avatar
                ? avatar
                : 'https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp'
            }
          />
          <div class="crt-ifr-crt">
            {' '}
            <div class="ctr-title">
              {' '}
              <div class="ctr-name-time">
                <div class="name-time">
                  {' '}
                  <div class="nms-pr">
                    {' '}
                    <strong class="hs-sr1">{name}</strong>
                    <div class="hover-user-inf"></div>
                  </div>
                  <ctr-opa>|</ctr-opa>
                  <p class="ps-sr1">{formatDate(timePublic)}</p>
                </div>

                <div class="d-rep">
                  {' '}
                  <UseDropdownReport />
                </div>
              </div>
              <p class="ps-sr1">Producto comprando el {formatDate(buyTime)}</p>
              <div class="ctr-str">
                {' '}
                <p class="ps-sr1">Rating: </p>
                <strong class="hs-sr1">{ratingText}</strong>
                <Stars color="#008080" rating={rating} />
              </div>
              <strong class="hs-sr1">{title}</strong>
            </div>
            <div class="ctr-comment">
              <p>{comment}</p>
            </div>
            <div class="grap-imgs">
              {images &&
                images
                  ?.slice(0, showAllImg.setShowAllImg ? images.length : 4)
                  .map((img: any) => (
                    <>
                      {' '}
                      <div class="ctr-img">
                        <img src={img} alt="" />
                        <div class="hover-text">Ver</div>
                      </div>
                    </>
                  ))}
            </div>
            {images?.length > 4 ? (
              <div
                class="ctrIMg"
                onClick$={() =>
                  (showAllImg.setShowAllImg = !showAllImg.setShowAllImg)
                }
              >
                {showAllImg.setShowAllImg ? (
                  <div class="ttle-sh">
                    <DouveryArrowUp size="15" /> Ver menos
                  </div>
                ) : (
                  <div class="ttle-sh">
                    <DouveryArrowDown size="15" /> Ver más ({images?.length - 4}
                    )
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div class="container-vots">
          {action.isRunning ? (
            <span class="loa-s">Verifying...</span>
          ) : (
            <>
              <span class="error ">{action.value?.message}</span>
            </>
          )}
          <div class="container-helpful-nohelpful">
            <button
              class={`button-helpful ${
                currentUserHelpful ? 'button-active' : ''
              }`}
              onClick$={handleHelpful}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M229.12 142.65a22.43 22.43 0 0 0-19.55-3.88l-4.32 1C227 119.55 238 99.51 238 80c0-25.36-20.39-46-45.46-46A45.51 45.51 0 0 0 156 52a45.51 45.51 0 0 0-36.54-18C94.39 34 74 54.64 74 80c0 11.38 3.63 22.49 11.29 34.36a29.73 29.73 0 0 0-16.56 8.43L45.52 146H16a14 14 0 0 0-14 14v40a14 14 0 0 0 14 14h104a6 6 0 0 0 1.46-.18l64-16a7.16 7.16 0 0 0 .89-.3L225.17 181l.33-.15a22.6 22.6 0 0 0 3.62-38.18ZM119.46 46a33.16 33.16 0 0 1 31 20.28a6 6 0 0 0 11.1 0a33.16 33.16 0 0 1 31-20.28C210.68 46 226 61.57 226 80c0 20.24-16.18 43-46.8 65.75l-14.87 3.42A26 26 0 0 0 140 114H99.67C90.36 101.67 86 90.81 86 80c0-18.43 15.32-34 33.46-34ZM14 200v-40a2 2 0 0 1 2-2h26v44H16a2 2 0 0 1-2-2Zm206.28-30l-38.2 16.27L119.26 202H54v-47.51l23.21-23.22A17.88 17.88 0 0 1 89.94 126H140a14 14 0 0 1 0 28h-28a6 6 0 0 0 0 12h32a6 6 0 0 0 1.34-.15l67-15.41l.24-.06a10.6 10.6 0 0 1 7.7 19.62Z"
                />
              </svg>
              <p>{helpfulReview.value} Helpful</p>
            </button>

            <button
              class={`button-helpful  ${
                currentUserNoHelpful ? 'button-active' : ''
              } `}
              onClick$={handleNOHelpful}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                >
                  <path d="M16.472 3.5H4.1a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6h2.768a2 2 0 0 1 1.715.971l2.71 4.517a1.631 1.631 0 0 0 2.961-1.308l-1.022-3.408a.6.6 0 0 1 .574-.772h4.575a2 2 0 0 0 1.93-2.526l-1.91-7A2 2 0 0 0 16.473 3.5Z" />
                  <path stroke-linejoin="round" d="M7 14.5v-11" />
                </g>
              </svg>

              <p>{nohelpfulReview.value} No helpful</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
