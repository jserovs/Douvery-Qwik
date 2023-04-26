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
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16.75C11.6 16.75 11.2 16.72 10.82 16.65C8.7 16.34 6.77 15.12 5.55 13.31C4.7 12.03 4.25 10.54 4.25 9C4.25 4.73 7.73 1.25 12 1.25C16.27 1.25 19.75 4.73 19.75 9C19.75 10.54 19.3 12.03 18.45 13.31C17.22 15.13 15.29 16.34 13.15 16.66C12.8 16.72 12.4 16.75 12 16.75ZM12 2.75C8.55 2.75 5.75 5.55 5.75 9C5.75 10.25 6.11 11.45 6.79 12.47C7.78 13.93 9.33 14.91 11.05 15.16C11.69 15.27 12.32 15.27 12.91 15.16C14.66 14.91 16.21 13.92 17.2 12.46C17.88 11.44 18.24 10.24 18.24 8.98999C18.25 5.54999 15.45 2.75 12 2.75Z"
                  fill="#0F6292"
                />
                <path
                  d="M6.46933 22.59C6.32933 22.59 6.19933 22.57 6.05933 22.54C5.40933 22.39 4.90933 21.89 4.75933 21.24L4.40933 19.77C4.38933 19.68 4.31933 19.61 4.21933 19.58L2.56933 19.19C1.94933 19.04 1.45933 18.58 1.28933 17.97C1.11933 17.36 1.28933 16.7 1.73933 16.25L5.63933 12.35C5.79933 12.19 6.01933 12.11 6.23933 12.13C6.45933 12.15 6.65933 12.27 6.78933 12.46C7.77933 13.92 9.32933 14.91 11.0593 15.16C11.6993 15.27 12.3293 15.27 12.9193 15.16C14.6693 14.91 16.2193 13.92 17.2093 12.46C17.3293 12.27 17.5393 12.15 17.7593 12.13C17.9793 12.11 18.1993 12.19 18.3593 12.35L22.2593 16.25C22.7093 16.7 22.8793 17.36 22.7093 17.97C22.5393 18.58 22.0393 19.05 21.4293 19.19L19.7793 19.58C19.6893 19.6 19.6193 19.67 19.5893 19.77L19.2393 21.24C19.0893 21.89 18.5893 22.39 17.9393 22.54C17.2893 22.7 16.6193 22.47 16.1993 21.96L11.9993 17.13L7.79933 21.97C7.45933 22.37 6.97933 22.59 6.46933 22.59ZM6.08933 14.03L2.79933 17.32C2.70933 17.41 2.71933 17.51 2.73933 17.57C2.74933 17.62 2.79933 17.72 2.91933 17.74L4.56933 18.13C5.21933 18.28 5.71933 18.78 5.86933 19.43L6.21933 20.9C6.24933 21.03 6.34933 21.07 6.40933 21.09C6.46933 21.1 6.56933 21.11 6.65933 21.01L10.4893 16.6C8.78933 16.27 7.22933 15.36 6.08933 14.03ZM13.5093 16.59L17.3393 20.99C17.4293 21.1 17.5393 21.1 17.5993 21.08C17.6593 21.07 17.7493 21.02 17.7893 20.89L18.1393 19.42C18.2893 18.77 18.7893 18.27 19.4393 18.12L21.0893 17.73C21.2093 17.7 21.2593 17.61 21.2693 17.56C21.2893 17.51 21.2993 17.4 21.2093 17.31L17.9193 14.02C16.7693 15.35 15.2193 16.26 13.5093 16.59Z"
                  fill="#0F6292"
                />
                <path
                  d="M13.8911 12.89C13.6311 12.89 13.3211 12.82 12.9511 12.6L12.0011 12.03L11.0511 12.59C10.1811 13.11 9.61112 12.81 9.40112 12.66C9.19112 12.51 8.74112 12.06 8.97112 11.07L9.21112 10.04L8.41112 9.29999C7.97112 8.85999 7.81112 8.33001 7.96112 7.85001C8.11112 7.37001 8.55112 7.02999 9.17112 6.92999L10.2411 6.75L10.7511 5.63C11.0411 5.06 11.4911 4.73999 12.0011 4.73999C12.5111 4.73999 12.9711 5.07001 13.2511 5.64001L13.8411 6.82001L14.8311 6.94C15.4411 7.04 15.8811 7.37999 16.0411 7.85999C16.1911 8.33999 16.0311 8.87 15.5911 9.31L14.7611 10.14L15.0211 11.07C15.2511 12.06 14.8011 12.51 14.5911 12.66C14.4811 12.75 14.2411 12.89 13.8911 12.89ZM9.61112 8.39001L10.3011 9.07999C10.6211 9.39999 10.7811 9.94 10.6811 10.38L10.4911 11.18L11.2911 10.71C11.7211 10.46 12.3011 10.46 12.7211 10.71L13.5211 11.18L13.3411 10.38C13.2411 9.93001 13.3911 9.39999 13.7111 9.07999L14.4011 8.39001L13.5311 8.23999C13.1111 8.16999 12.6911 7.86001 12.5011 7.48001L12.0011 6.5L11.5011 7.5C11.3211 7.87 10.9011 8.19001 10.4811 8.26001L9.61112 8.39001Z"
                  fill="#0F6292"
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
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.75C7.86 15.75 4.5 12.5 4.5 8.5C4.5 4.5 7.86 1.25 12 1.25C16.14 1.25 19.5 4.5 19.5 8.5C19.5 12.5 16.14 15.75 12 15.75ZM12 2.75C8.69 2.75 6 5.33 6 8.5C6 11.67 8.69 14.25 12 14.25C15.31 14.25 18 11.67 18 8.5C18 5.33 15.31 2.75 12 2.75Z"
                  fill="#0F6292"
                />
                <path
                  d="M15.62 22.7501C15.34 22.7501 15.06 22.6801 14.77 22.5501L12.08 21.2801C12.05 21.2701 11.94 21.2701 11.9 21.2801L9.23002 22.5401C8.64002 22.8201 8.02001 22.8101 7.54001 22.5001C7.04001 22.1801 6.75002 21.5901 6.76002 20.8901L6.77 13.5101C6.77 13.1001 7.09 12.7401 7.52 12.7601C7.93 12.7601 8.27 13.1001 8.27 13.5101L8.26002 20.8901C8.26002 21.1101 8.32001 21.2201 8.35001 21.2301C8.37001 21.2401 8.46001 21.2501 8.60001 21.1801L11.28 19.9101C11.71 19.7101 12.3 19.7101 12.73 19.9101L15.42 21.1801C15.56 21.2501 15.65 21.2401 15.67 21.2301C15.7 21.2101 15.76 21.1001 15.76 20.8901V13.3301C15.76 12.9201 16.1 12.5801 16.51 12.5801C16.92 12.5801 17.26 12.9201 17.26 13.3301V20.8901C17.26 21.6001 16.97 22.1801 16.47 22.5001C16.21 22.6701 15.92 22.7501 15.62 22.7501Z"
                  fill="#0F6292"
                />
              </svg>

              <p>{nohelpfulReview.value} No helpful</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
