import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-grid-1.css?inline';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
export const CategoryGrid1 = component$(({ categorie }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const loc = useLocation();
  const navigateTo = $((id: string) => {
    nav(
      loc.params.id
        ? '/' +
            categorie.name +
            '/' +
            'STORE-' +
            loc.params.id +
            '/c' +
            '/' +
            id
        : '/Douvery/STORE-3465460B-51D47297-87C20FED/h/',
      true
    );
  });
  return (
    <div
      key={categorie.name}
      class="card-item"
      onClick$={() => navigateTo(categorie.name)}
    >
      <div class="container-details">
        <h2>{categorie.name}</h2>
        <p>Mas de {categorie.count - 1} productos</p>
        <button>Ver mas</button>
      </div>

      <img width={100} height={100} src={categorie.img} alt={categorie.name} />
    </div>
  );
});
