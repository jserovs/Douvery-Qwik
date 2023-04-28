import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './container-box-comments.css?inline';
import { CardComment1 } from '~/components/cards/comment/card-comment-1/card-comment-1';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import type { reviewsProduct } from '~/utils/types';
import { fetchReviewsProduct } from '~/services/reviews/reviews_product/reviews_product';
import { useLocation } from '@builder.io/qwik-city';

interface IState {
  searchInput: string;
  reviewsProduct: reviewsProduct[];
  photos: [];
  selectedValue: string;
}
export const ContainerBoxComments = component$(({ datePurchase }: any) => {
  useStylesScoped$(style);
  const showAllQuestions = useSignal(false);

  const state = useStore<IState>({
    searchInput: '',
    reviewsProduct: {} as reviewsProduct[],
    photos: [] as any,
    selectedValue: '',
  });

  const loc = useLocation();

  const reviewResourse = useResource$(async () => {
    const data = await fetchReviewsProduct(loc.params.dui);
    state.reviewsProduct = data.reviews;
    state.photos = data.photos;
  });
  const showAllImg = useSignal(false);
  return (
    <div class="ctr-comment" id="REVIEWS">
      <hs-sr3>Opiniones de compradores</hs-sr3>

      <div class="ctr-comment-box">
        <div class="suggestions">
          <Resource
            value={reviewResourse}
            onPending={() => <div class="loader"></div>}
            onRejected={() => (
              <>
                Al parecer, hemos cometido un error. Por favor, actualiza la
                página para verificar nuevamente.
              </>
            )}
            onResolved={() => (
              <>
                {state.photos?.length > 0 && (
                  <>
                    <p>
                      Colección de imágenes de clientes que han comprado el
                      producto.
                    </p>
                    <br />
                    <div class="ctr-images-box">
                      <div class="grap-imgs">
                        {state.photos &&
                          state.photos
                            ?.slice(
                              0,
                              showAllImg.value ? state.photos.length : 4
                            )
                            .map((img: any) => (
                              <>
                                {' '}
                                <div class="container-img-reviews">
                                  <img src={img} />
                                </div>
                              </>
                            ))}
                      </div>
                    </div>
                    {state.photos?.length > 4 ? (
                      <div
                        class="container-show-all-imgs"
                        onClick$={() => (showAllImg.value = !showAllImg.value)}
                      >
                        {showAllImg.value ? (
                          <div class="ttle-sh">
                            <DouveryArrowUp size="15" /> Ver menos
                          </div>
                        ) : (
                          <div class="ttle-sh">
                            <DouveryArrowDown size="15" /> Ver más (
                            {state.photos?.length - 4}) Imagenes
                          </div>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    <br />
                    <br />
                  </>
                )}

                {state.reviewsProduct.length > 0 ? (
                  <ul>
                    {state.reviewsProduct
                      .slice(
                        0,
                        showAllQuestions.value ? state.reviewsProduct.length : 5
                      )
                      .map((review: any) => {
                        return (
                          <div class="container-box-reviews" key={review.id}>
                            <CardComment1
                              id={review._id}
                              timePublic={review.date}
                              buyTime={review.purchaseDates[0]}
                              avatar={review.buyer.avatar}
                              name={
                                review.buyer.name + ' ' + review.buyer.lastname
                              }
                              rating={review.rating}
                              title={review.title}
                              comment={review.review}
                              images={review.photos}
                              helpful={review.helpful}
                              notHelpful={review.notHelpful}
                              datePurchase={datePurchase}
                              comments={review.comments}
                            />
                          </div>
                        );
                      })}
                  </ul>
                ) : (
                  <div class="no-results"> No hay resultados </div>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div class="ctr-bts-sh">
        <button
          onClick$={() => (showAllQuestions.value = !showAllQuestions.value)}
        >
          {showAllQuestions.value ? (
            <srw-sr1>
              <DouveryArrowUp size="15" /> Ver menos
            </srw-sr1>
          ) : (
            <srw-sr1>
              <DouveryArrowDown size="15" /> Ver más
            </srw-sr1>
          )}
        </button>
      </div>
    </div>
  );
});
