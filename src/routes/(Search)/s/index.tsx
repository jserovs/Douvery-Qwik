import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';
import { fetchSearchProduct } from '~/services/fechProduct';
import styles from './index.css?inline';
import type { Product } from '~/utils/types';
import { Card1S } from '~/components/cards/search/card-1-s/card-1-s';
import { Stars } from '~/components/Ratings/stars/stars';

export default component$(() => {
  useStylesScoped$(styles);
  const { url } = useLocation();
  const navigate = useNavigate();
  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => url.search);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    const category = url.searchParams.get('or-c') || 'all';
    const query = url.searchParams.get('q') || '';
    const price = url.searchParams.get('or-p') || 'all';
    const rating = url.searchParams.get('or-r') || 'all';
    const order = url.searchParams.get('or-or') || 'newest';
    const page = url.searchParams.get('or-p') || 1;

    return fetchSearchProduct(
      category,
      query,
      price,
      rating,
      order,
      page,
      controller
    );
  });

  const prices = [
    {
      name: '$1 to $50',
      value: '1-50',
    },
    {
      name: '$51 to $200',
      value: '51-200',
    },
    {
      name: '$201 to $1000',
      value: '201-1000',
    },
  ];

  const ratings = [
    {
      name: '4stars & up',
      rating: 4,
    },

    {
      name: '3stars & up',
      rating: 3,
    },

    {
      name: '2stars & up',
      rating: 2,
    },

    {
      name: '1stars & up',
      rating: 1,
    },
  ];

  const selectedValue = useStore({ selectedValue: 'all' });

  return (
    <div class="grid-container">
      <div class="filter-section">
        <div class="filter-section-header">
          <h2>Filter</h2>
          <p class="filter-button">Saber mas</p>
        </div>
        <div class="filter-section-body">
          <h3>By Category</h3>
          <label>
            <input type="checkbox" name="category" value="electronics" />
            Electronics
          </label>
          <label>
            <input type="checkbox" name="category" value="books" />
            Books
          </label>
          <label>
            <input type="checkbox" name="category" value="clothing" />
            Clothing
          </label>
          <h3>By Price Range</h3>
          {prices.map((p) => (
            <li
              class={
                url.searchParams.get('or-p') === p.value
                  ? 'active-undeline'
                  : ''
              }
              key={p.value}
            >
              <Link
                href={
                  url.pathname +
                  '?q=' +
                  url.searchParams.get('q') +
                  '&or-p=' +
                  p.value
                }
                class={
                  url.searchParams.get('or-p') === p.value
                    ? 'active-undeline'
                    : ''
                }
              >
                {p.name}
              </Link>
            </li>
          ))}{' '}
          <h3>By Color</h3>
          <label>
            <input type="checkbox" name="color" value="red" />
            Red
          </label>
          <label>
            <input type="checkbox" name="color" value="blue" />
            Blue
          </label>
          <label>
            <input type="checkbox" name="color" value="green" />
            Green
          </label>
          <h3>By Size</h3>
          <label>
            <input type="checkbox" name="size" value="small" />
            Small
          </label>
          <label>
            <input type="checkbox" name="size" value="medium" />
            Medium
          </label>
          <label>
            <input type="checkbox" name="size" value="large" />
            Large
          </label>
          <h3>By Ratings</h3>
          <ul>
            {ratings.map((r) => (
              <li key={r.name}>
                <Link
                  class="linkdepart"
                  href={
                    url.pathname +
                    '?q=' +
                    url.searchParams.get('q') +
                    '&or-r=' +
                    r.rating
                  }
                >
                  <Stars caption={' & up'} rating={r.rating}></Stars>
                </Link>
              </li>
            ))}
            <li>
              <Link class="linkdepart">
                <Stars caption={' & up'} rating={0}></Stars>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div class="product-section">
        <strong>Resultado de busqueda de : </strong> {url.searchParams.get('q')}
        <div class="text-end">
          Ordenar por{' '}
          <select
            value={selectedValue.selectedValue}
            onChange$={(event) =>
              navigate(
                url.pathname +
                  '?q=' +
                  url.searchParams.get('q') +
                  '&or-or=' +
                  event.target.value
              )
            }
          >
            <option value="newest">Llegadas más recientes</option>
            <option value="lowest">Precio: Bajo a Alto</option>
            <option value="highest">Precio: Alto a Bajo</option>
            <option value="toprated">Ratings positivos</option>
          </select>
        </div>
        <Resource
          value={prodcureducer}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(products) => (
            <ul>
              {products.map((product: any) => (
                <li key={product.id}>
                  <Card1S product={product} />
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    </div>
  );
});
