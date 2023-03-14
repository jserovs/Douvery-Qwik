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
import { Button1 } from '~/components/buttons/button-1/button-1';
import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';

export default component$(() => {
  useStylesScoped$(styles);

  const navigate = useNavigate();

  const { url } = useLocation();

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

  const category = [
    {
      name: 'Books',
      value: 'books',
    },
    {
      name: 'Moda Para Hombre',
      value: 'moda para hombre',
    },
    {
      name: 'Computadoras Y Accesorios',
      value: 'computadoras y accesorios',
    },
  ];
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

  const selectedValue = useStore({ selectedValue: '' });
  const or_c = url.searchParams.has('or-c')
    ? `&or-c=${url.searchParams.get('or-c')}`
    : '';
  const or_p = url.searchParams.has('or-p')
    ? `&or-p=${url.searchParams.get('or-p')}`
    : '';

  return (
    <div class="grid-container">
      <div class="filter-section">
        <div class="filter-section-header">
          <h2>Filters</h2>
          <div class="filter">
            {or_c || or_p ? (
              <Button1
                title="Desmarcar filtros"
                navigate={url.pathname + `?q=${url.searchParams.get('q')}`}
              />
            ) : (
              <>
                <div class="svg-left">
                  {' '}
                  <DouveryLeft3 size="15px" />
                </div>{' '}
                <div class="svg-up">
                  {' '}
                  <DouveryArrowUp size="15px" />
                </div>
                Mejora tu busqueda
              </>
            )}
          </div>
        </div>
        <div class="filter-section-body">
          <h3>By Category</h3>
          {category.map((c) => (
            <div>
              <label
                class={
                  url.searchParams.get('or-c') === c.value
                    ? 'active-undeline'
                    : ''
                }
              >
                <input type="checkbox" name="category" value={c.value} />
                <Link
                  href={
                    url.pathname +
                    `?q=${url.searchParams.get('q')}` +
                    `&or-c=${c.value}` +
                    or_p
                  }
                >
                  {c.name}
                </Link>
              </label>
            </div>
          ))}
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
                  `?q=${url.searchParams.get('q')}` +
                  or_c +
                  `&or-p=${p.value}`
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
                    `?q=${url.searchParams.get('q')}` +
                    or_c +
                    `&or-r=${r.rating}`
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
        <div class="header-product-section">
          <div class="container-result">
            {' '}
            <strong>Resultados de: </strong> {url.searchParams.get('q')}
          </div>
          <div class="container-select">
            <div class="select">
              <label class="select-label" for="slct">
                Ordenar por:
              </label>
              <select
                id="slct"
                value={
                  selectedValue.selectedValue
                    ? selectedValue.selectedValue
                    : 'toprated'
                }
                onChange$={(event) =>
                  navigate(
                    url.pathname +
                      '?q=' +
                      url.searchParams.get('q') +
                      or_c +
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
              <DouveryArrowDown size="14px" />
            </div>
          </div>
        </div>
        <Resource
          value={prodcureducer}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(products) => (
            <ul>
              {products.length === 0 ? (
                <p>No hay productos para mostrar.</p>
              ) : (
                <ul>
                  {products.map((product: any) => (
                    <l i key={product.id}>
                      <Card1S product={product} />
                    </l>
                  ))}
                </ul>
              )}
            </ul>
          )}
        />

        <div class="pagination">
          <a href="#" class="prev">
            &#8249; Anterior
          </a>
          <a href="#" class="active">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" class="next">
            Siguiente &#8250;
          </a>
        </div>
      </div>
    </div>
  );
});
