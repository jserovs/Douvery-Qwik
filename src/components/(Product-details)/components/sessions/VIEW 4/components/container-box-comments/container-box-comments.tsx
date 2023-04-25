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

  const comment = [
    {
      timePublic: 'May 21,2022',
      rating: {
        title: 'Bueno',
        rating: 4,
      },

      name: 'Juan Garcia',
      buyTime: 'May 19,2022',
      images: [
        'https://d500.epimg.net/cincodias/imagenes/2022/05/09/gadgets/1652093465_328420_1652093764_noticia_normal_recorte1.jpg',
        'https://i.guim.co.uk/img/media/02133306ef973ec89cdbd4209ddf19c965aa8d82/714_651_4276_2565/master/4276.jpg?width=620&quality=85&dpr=1&s=none',
        'https://i.blogs.es/4c6406/airpods-pro-review-xataka-3/1366_2000.jpg',
        'https://image.cnbcfm.com/api/v1/image/107122314-1663786025857-IMG_03711.jpg?v=1672059601&w=740&h=416&ffmt=webp&vtcrop=y',
      ],
      comment:
        'El producto es muy bueno, llegó en perfectas condiciones y cumplió con mis expectativas.',
    },
    {
      timePublic: 'June 5,2022',
      rating: {
        title: 'Regular',
        rating: 3,
      },

      name: 'Perla Lopez',
      buyTime: 'June 3,2022',

      comment:
        'El producto es aceptable, pero no es exactamente lo que estaba buscando. El envío fue rápido y sin problemas.',
    },
    {
      timePublic: 'July 2,2022',
      rating: {
        title: 'Excelente',
        rating: 5,
      },

      name: 'Francisco Quintero',
      buyTime: 'June 28,2022',
      comment:
        'Estoy muy contento con mi compra. El producto es de alta calidad y la entrega fue rápida. Lo recomendaría sin dudarlo.',
    },
  ];

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
                        showAllQuestions.value
                          ? state.reviewsProduct.length
                          : 5
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
         onClick$={() =>
          (showAllQuestions.value =
            !showAllQuestions.value)
        }
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
