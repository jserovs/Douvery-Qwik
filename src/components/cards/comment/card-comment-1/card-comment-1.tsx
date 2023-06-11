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
import { TextCL } from '~/components/use/textCL/textCL';
import { CommentReply } from './reply/comment-reply';
import { CardSubComment } from '../sub-card-comments/sub-comment';

export const useSubmitGlobal = globalAction$(
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
    datePurchase,
    comments,
    initialCommentsToShow = 1,
    commentsPerLoad = 5,
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
    const action = useSubmitGlobal();
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
    const reply = useSignal(false);

    const handleReplyComment = $(() => {
      if (!user) {
        nav('/a/login/' + '?rr=' + loc.url.pathname, true);
        return;
      }
      reply.value = !reply.value;
    });
    const isExpanded = useSignal(false);
    const commentsToShow = useSignal([0, 1]);

    const loadMoreComments = $(() => {
      if (!isExpanded.value || commentsToShow.value.length < comments.length) {
        const newIndices = [...commentsToShow.value];
        const lastIndex = newIndices[newIndices.length - 1];

        for (let i = 1; i <= commentsPerLoad; i++) {
          if (lastIndex + i < comments.length) {
            newIndices.push(lastIndex + i);
          }
        }

        commentsToShow.value = newIndices;
        isExpanded.value = true;
      } else {
        commentsToShow.value = Array.from(
          { length: initialCommentsToShow },
          (_, i) => i
        );
        isExpanded.value = false;
      }
    });
    return (
      <div class="container-all" id={'review-' + id}>
        <div class="ctr-box-user">
          <img
            width={50}
            height={50}
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
            </div>
            <div class="ctr-comment">
              <strong class="hs-sr1">
                {' '}
                <TextCL text={title} />
              </strong>
              <p>
                <TextCL text={comment} />
              </p>
            </div>
            <div class="grap-imgs">
              {images &&
                images
                  ?.slice(0, showAllImg.setShowAllImg ? images.length : 4)
                  .map((img: any) => (
                    <>
                      {' '}
                      <div class="container-img-reviews">
                        <img width={50} height={50} src={img} />
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
          <div class="container-message">
            <button onClick$={handleReplyComment}>
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  d="m5.5 11.493l.416-.278a.5.5 0 0 0-.416-.222v.5Zm2 2.998l-.416.277a.5.5 0 0 0 .832 0l-.416-.277Zm2-2.998v-.5a.5.5 0 0 0-.416.222l.416.278Zm-4.416.277l2 2.998l.832-.555l-2-2.998l-.832.555Zm2.832 2.998l2-2.998l-.832-.555l-2 2.998l.832.555ZM9.5 11.993h4v-1h-4v1Zm4 0c.829 0 1.5-.67 1.5-1.5h-1c0 .277-.223.5-.5.5v1Zm1.5-1.5V1.5h-1v8.994h1ZM15 1.5c0-.83-.671-1.5-1.5-1.5v1c.277 0 .5.223.5.5h1ZM13.5 0h-12v1h12V0Zm-12 0C.671 0 0 .67 0 1.5h1c0-.277.223-.5.5-.5V0ZM0 1.5v8.993h1V1.5H0Zm0 8.993c0 .83.671 1.5 1.5 1.5v-1a.499.499 0 0 1-.5-.5H0Zm1.5 1.5h4v-1h-4v1ZM5 8h5V7H5v1ZM4 5h7V4H4v1Z"
                />
              </svg>
              Comment
            </button>
          </div>
          <div class="ctr-opa">|</div>
          <div class="container-helpful-nohelpful">
            <button
              class={`button-helpful ${
                currentUserHelpful ? 'button-active' : ''
              }`}
              onClick$={handleHelpful}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
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
                width="18"
                height="18"
                viewBox="0 0 24 24"
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

              <p>{nohelpfulReview.value} No helpful</p>
            </button>
          </div>
        </div>

        {reply.value && (
          <div class="reply-comment">
            <div class="container-icon-reply">
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
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="m15 10l5 5l-5 5" />
                  <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                </g>
              </svg>
            </div>
            <CommentReply id={id} datePurchase={datePurchase} />
          </div>
        )}
        {comments && comments.length > 0 && (
          <div class="sub-comments">
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
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M14 9L9 4L4 9" />
                <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
              </g>
            </svg>{' '}
            <div class="container-comments">
              {comments
                ?.filter((_: any, index: number) =>
                  commentsToShow.value.includes(index)
                )
                .map((comment: any) => {
                  return (
                    <div class="container-box-reviews" key={comment.id}>
                      <CardSubComment
                        name_lastname={
                          comment.authorName +
                          ' ' +
                          (comment.authorLastName === undefined ||
                          comment.authorLastName === 'undefined'
                            ? ''
                            : comment.authorLastName)
                        }
                        avatar={comment.authorAvatar}
                        comment={comment.content}
                        purchase={comment.hasPurchased}
                        time={comment.date}
                      />{' '}
                    </div>
                  );
                })}
              {comments && comments.length > 2 && (
                <button
                  onClick$={loadMoreComments}
                  class="load-more-comments-button"
                >
                  {isExpanded.value &&
                  commentsToShow.value.length >= comments.length ? (
                    <div class="show less">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m16.9 13.4l-4.2-4.2c-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4s1 .4 1.4 0l3.5-3.5l3.5 3.5c.2.2.4.3.7.3c.3 0 .5-.1.7-.3c.4-.4.4-1 0-1.4z"
                        />
                      </svg>
                      <p>Mostrar menos</p>
                    </div>
                  ) : (
                    <div class="show more">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14.3 14.8L12 17.1l-2.3-2.3c-.4-.4-1-.4-1.4 0c-.4.4-.4 1 0 1.4l3 3c.2.2.4.3.7.3c.3 0 .5-.1.7-.3l3-3c.4-.4.4-1 0-1.4c-.4-.4-1-.4-1.4 0zm-4.6-4.6L12 7.9l2.3 2.3c.2.2.4.3.7.3c.3 0 .5-.1.7-.3c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-3 3c-.4.4-.4 1 0 1.4c.4.4 1 .4 1.4 0z"
                        />
                      </svg>
                      <p>Cargar más comentarios</p>
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
