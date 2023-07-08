import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './view4.css?inline';
import { ContaineProductReviewsRatingProgress } from './components/container-rating-progress/container-rating-progress';
import { ContainerBoxQuestionsAnswered } from './components/container-box-questions-answered/container-box-questions-answered';
import { ContainerBoxInputComments } from './components/container-box-input-comments/container-box-input-comments';
import { ContainerBoxComments } from './components/container-box-comments/container-box-comments';
import { fetchCanUserComments } from '~/services/reviews/reviews_product/reviews_product';
import { useGetCurrentUser } from '~/routes/layout';
import { useLocation } from '@builder.io/qwik-city';
import type { CheckComment } from '~/utils/types';
import { ContainerTermsComments } from './components/container-terms-comments/container-terms-comments';

interface IState {
  checkReviewsProduct: CheckComment;
}

export const View4 = component$(({ product }: any) => {
  product;

  const state = useStore<IState>({
    checkReviewsProduct: {} as CheckComment,
  });
  useStylesScoped$(styles);
  const loc = useLocation();
  const user = useGetCurrentUser().value;
  const checkReviewsProduct = useResource$(async () => {
    const data = await fetchCanUserComments(loc.params.dui, `${user?.id}`);
    state.checkReviewsProduct = data;
  });
  return (
    <div class="ctnr-view-4">
      {' '}
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Opiniones & ratings del producto</hs-sr3>
          <div class="srs-v">
            <a class="ps-sr1">Saber mas</a>
          </div>
        </div>
        <p class="ps-sr1">Ahorra dinero al comprar en conjunto</p>
        <div class="srs-md">
          <a class="ps-sr1">Saber mas</a>
        </div>
      </div>
      <div class="content">
        <Resource
          value={checkReviewsProduct}
          onPending={() => <div class="loader"></div>}
          onRejected={() => (
            <>
              Debe iniciar sesión y comprar un producto antes de poder dejar un
              comentario. <br />
              <a class="link-login" href="/a/login">
                Iniciar sesión
              </a>
            </>
          )}
          onResolved={() => (
            <>
              {state.checkReviewsProduct.canComment}
              <div class="viewleft">
                <div class="part-1">
                  <ContaineProductReviewsRatingProgress product={product} />
                  <ContainerBoxQuestionsAnswered />
                </div>
                <div class="part-2">
                  {state.checkReviewsProduct.canComment ? (
                    <>
                      {' '}
                      <div class="crrts-title">
                        <div class="ofrs">
                          <hs-sr3>Puedes agregar tu opinión</hs-sr3>
                        </div>
                        <p class="ps-sr1">
                          Comparte y comenta tu mas sincera opinion
                        </p>
                      </div>
                      <div class="container-inputs">
                        <ContainerBoxInputComments
                          datePurchase={
                            state.checkReviewsProduct.lastPurchaseDate
                          }
                        />
                        <ContainerTermsComments />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </>
          )}
        />
        <ContainerBoxComments
          datePurchase={state.checkReviewsProduct.lastPurchaseDate}
        />
      </div>
      <div class="part-2"></div>
    </div>
  );
});
