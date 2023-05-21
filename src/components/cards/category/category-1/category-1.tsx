import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-1.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
export const Card_Category_1 = component$(({ name, image }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const navigate = $((url: string) => {
    nav(url, true);
  });
  return (
    <div
      class="category-card"
      onClick$={() => navigate('/s-categorie/electronic%20y%20accesorios/')}
    >
      <div class="category-info">
        <h1>{name}</h1>
      </div>

      <div class="category-img">
        <img
          src={image}
          width="250"
          height="250"
          alt={'image categorie ' + name}
        />
      </div>
      <div class="show-more">
        <a href={`/s-categorie/electronic%20y%20accesorios/`}> Ver todos</a>
      </div>
    </div>
  );
});
