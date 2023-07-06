import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './useRatingHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { ContainerProgres } from '~/components/progres-bar/container-progres/container-progres';
import { fetchProductRatings } from '~/services/reviews/rating/rating';
import { truncarDecimales } from '~/services/fuction';
interface Rating {
  rating: number;
  count: number;
}
export const UseStarRating = component$(({ product, color, size }: any) => {
  useStylesScoped$(styles);

  const rating = useStore<Rating>({
    rating: 0,
    count: 0,
  });
  const productRating = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const response = await fetchProductRatings(product.dui);
    return response;
  });

  const rate = truncarDecimales(rating.rating, 1);
  return (
    <>
      <Resource
        value={productRating}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(data: any) => (
          <div class="container-all">
            <div class="ctr-stars">
              <Stars size={size} color={color} rating={data.rating} />{' '}
              <div class="ctr-progr">
                <div class="tolst-tip"></div>
                <div class="pr-ttle">
                  <p class="hs-sr1">Ratings</p>
                </div>
                <ContainerProgres product={product} />
                <div class="pr-qtyon">
                  <p class="ps-sr1">Sin preguntas Respondidas</p>
                </div>
              </div>
            </div>
            <div class="ct-ratig">
              ({rate}) {data.count}
            </div>
          </div>
        )}
      />
    </>
  );
});
