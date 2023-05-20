import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-recets.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
export const CardOutstandingRecents = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  return (
    <div class="category-card">
      <div class="container-a">
        <div class="category-info">
          <h1>Mas reciente en Douvery</h1>
        </div>

        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
      <div
        class="image-container"
        onClick$={() =>
          nav('/v/' + productPopular.slug + '/' + productPopular.dui, true)
        }
      >
        <img src={productPopular.images[0]} alt={productPopular.name + 'img product'} />
      </div>
    </div>
  );
});
