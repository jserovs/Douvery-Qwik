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
  selectedValue: string;
}
export const ContainerBoxComments = component$(({ datePurchase }: any) => {
  useStylesScoped$(style);
  const showAllQuestions = useSignal(false);

  const state = useStore<IState>({
    searchInput: '',
    reviewsProduct: {} as reviewsProduct[],
    selectedValue: '',
  });

  const loc = useLocation();

  const reviewResourse = useResource$(async () => {
    const data = await fetchReviewsProduct(loc.params.dui);
    state.reviewsProduct = data.reviews;
  });

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
