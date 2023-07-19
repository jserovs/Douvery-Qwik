import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './UseStarRatingNoHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { fetchProductRatings } from '~/services/reviews/rating/rating';

export const UseStarRatingNoHover = component$(
  ({ product, color, size }: any) => {
    useStylesScoped$(styles);

    const productRating = useResource$(async ({ cleanup }) => {
      const controller = new AbortController();
      cleanup(() => controller.abort());

      const response = await fetchProductRatings(product.dui);
      return response;
    });

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
              </div>
              <div class="ct-ratig">
                ({data.rating}) {data.count}
              </div>
            </div>
          )}
        />
      </>
    );
  }
);
