import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-grid-2.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
export const CategoryGrid2 = component$(({ categorie, store }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  const navigateTo = $((id: string) => {
    nav(
      '/' + store.name + '/' + 'STORE-' + store.ospayne + '/c' + '/' + id,
      true
    );
  });
  return (
    <div key={categorie.name} class="card-item">
      <div class="container-details">
        <h2>{categorie.name}</h2>

        <button onClick$={() => navigateTo(categorie.name)}>Ver mas</button>
      </div>

      <img src={categorie.img} alt={categorie.name} />
    </div>
  );
});
