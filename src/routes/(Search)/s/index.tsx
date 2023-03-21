import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { fetchProductU, fetchSearchProduct } from '~/services/fechProduct';
import styles from './index.css?inline';
import type { Product } from '~/utils/types';
import { Card1S } from '~/components/cards/search/card-1-s/card-1-s';
import { Stars } from '~/components/Ratings/stars/stars';
import { Button1 } from '~/components/buttons/button-1/button-1';
import { DouveryLeft3 } from '~/components/icons/arrow-left-3';
import { DouveryArrowUp } from '~/components/icons/arrow-up';
import { DouveryArrowDown } from '~/components/icons/arrow-down';

import { Carousel1 } from '~/components/use/carousel/carousel-1/carousel-1';
import { Card2S } from '~/components/cards/search/card-2-s/card-2-s';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import { Card3S } from '~/components/cards/search/card-3-s/card-3-s';
export const category = [
  {
    name: 'Any',
    value: 'all',
  },
  {
    name: 'Books',
    value: 'books',
    subCategory: [{ name: 'Pasta blanda', value: 'pasta blanda' }],
  },
  {
    name: 'Moda Para Hombre',
    value: 'moda para hombre',
    subCategory: [
      { name: 'Ropa', value: 'ropa' },
      { name: 'Calzado masculino', value: 'calzado masculino' },
      { name: 'Deportivo', value: 'deportivo' },
      { name: 'Tenis', value: 'tenis' },
    ],
  },
  {
    name: 'Computadoras  & Accesorios',
    value: 'computadoras y accesorios',
    subCategory: [
      { name: 'Monitor para videojuegos', value: 'monitor para videojuegos' },
      {
        name: 'Procesador para computadoras',
        value: 'procesador para computadoras',
      },
      { name: 'Laptop', value: 'laptop' },
      { name: 'Teclado', value: 'teclado' },
    ],
  },
  {
    name: 'Electronico & Accesorios',
    value: 'electronic Y accesorios',
    subCategory: [
      { name: 'Celulares', value: 'celular' },
      { name: 'Audífonos', value: 'audífonos' },
      { name: 'Televisores', value: 'televisor' },
      { name: 'Reloj moderno', value: 'reloj moderno' },
      { name: 'Volante de videojuegos', value: 'volante de videojuegos' },
    ],
  },
  {
    name: 'Nutrición',
    value: 'nutrición',
    subCategory: [
      { name: 'Nutrición deportiva', value: 'nutrición deportiva' },
    ],
  },
];
interface IState {
  searchInput: string;
}

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore({ count: 1 });
  const number = useStore({ setNumber: 1 });
  const navigate = useNavigate();
  const input = useStore<IState>({
    searchInput: '',
  });
  const { url } = useLocation();

  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => url.search && input.searchInput);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    const category = url.searchParams.get('or-c') || 'all';
    const subcategory = url.searchParams.get('or-sc') || 'all';
    const query = url.searchParams.get('q') || '';
    const price = url.searchParams.get('or-p') || 'all';
    const rating = url.searchParams.get('or-r') || 'all';
    const order = url.searchParams.get('or-or') || 'newest';
    const page = url.searchParams.get('or-page') || '1';
    const brand = url.searchParams.get('or-b') || 'all';

    return fetchSearchProduct(
      category,
      subcategory,
      query,
      price,
      rating,
      order,
      page,
      brand,
      controller
    );
  });
  const layout = url.searchParams.get('or-ly') || '';

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

  const brand = [
    {
      name: 'Douvery',
      value: 'douvery',
    },
    {
      name: 'Apple',
      value: 'apple',
    },
    {
      name: 'Under Armour',
      value: 'under armour',
    },
  ];

  const ratings = [
    {
      name: '5stars & up',
      rating: 5,
    },
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
  const or_sc = url.searchParams.has('or-sc')
    ? `&or-sc=${url.searchParams.get('or-sc')}`
    : '';
  const or_p = url.searchParams.has('or-p')
    ? `&or-p=${url.searchParams.get('or-p')}`
    : '';
  const or_ly = url.searchParams.has('or-ly')
    ? `&or-ly=${url.searchParams.get('or-ly')}`
    : '';

  const page = useStore({ setPage: 1 });
  const pages = useStore({ setPages: 1 });
  const pageLinks = [];
  for (let i = 1; i <= pages.setPages; i++) {
    const isActive = page.setPage === i;
    pageLinks.push(
      // eslint-disable-next-line qwik/single-jsx-root
      <a key={i} href="#" class={isActive ? 'active' : ''} onClick$={() => {}}>
        {i}
      </a>
    );
  }

  const state = useStore({
    productResults: [] as Product[],
  });

  useTask$(async () => {
    const controller = new AbortController();
    state.productResults = await fetchProductU(25);

    return () => {
      controller.abort();
    };
  });

  return (
    <div class="container-all">
      <div class="grid-container">
        <div class="filter-section">
          <div class="filter-section-header">
            <h2>Filters</h2>

            <div class="filter">
              {or_c || or_p ? (
                <Button1
                  title="Desmarcar filtros"
                  navigate={
                    url.pathname.replace(/ /g, '+') +
                    `?q=${url.searchParams.get('q')}`
                  }
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
            <div>
              {' '}
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
                        url.pathname.replace(/ /g, '+') +
                        `?q=${url.searchParams.get('q')}` +
                        `&or-c=${c.value}` +
                        or_p +
                        or_ly
                      }
                    >
                      {c.name}
                    </Link>
                  </label>
                  {url.searchParams.get('or-c') === c.value ? (
                    <div class="container-sub-category">
                      {c.subCategory?.map((c) => (
                        <div class="item">
                          <DouveryRight3
                            color={
                              url.searchParams.get('or-sc') === c.value
                                ? '#256D85'
                                : ''
                            }
                            size="14px"
                          />
                          <label
                            class={
                              url.searchParams.get('or-sc') === c.value
                                ? 'active-undeline'
                                : ''
                            }
                          >
                            <Link
                              href={
                                url.pathname +
                                `?q=${url.searchParams.get('q')}` +
                                or_c +
                                `&or-sc=${c.value}` +
                                or_p +
                                or_ly
                              }
                            >
                              {c.name}
                            </Link>
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
            <div>
              {' '}
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
                      `&or-p=${p.value}` +
                      or_ly
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
            </div>
            <div>
              {' '}
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
            </div>
            <div>
              {' '}
              <h3>By Brands</h3>
              <ul>
                {brand.map((b) => (
                  <li
                    key={b.name}
                    class={
                      url.searchParams.get('or-b') === b.value
                        ? 'active-undeline'
                        : ''
                    }
                  >
                    <label>
                      <Link
                        class="linkdepart"
                        href={
                          url.pathname +
                          `?q=${url.searchParams.get('q')}` +
                          or_c +
                          or_p +
                          `&or-b=${b.value}` +
                          or_ly
                        }
                      >
                        {b.name}
                      </Link>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {' '}
              <h3>By Ratings</h3>
              <ul>
                {ratings.map((r) => (
                  <li key={r.name}>
                    <label>
                      <Link
                        class="linkdepart"
                        href={
                          url.pathname +
                          `?q=${url.searchParams.get('q')}` +
                          or_c +
                          `&or-r=${r.rating}` +
                          or_ly
                        }
                      >
                        <Stars caption={' & up'} rating={r.rating}></Stars>
                      </Link>
                    </label>
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
        </div>

        <div class="product-section">
          <div class="header-product-section">
            <div class="container-result">
              {' '}
              <strong>Resultados de: </strong>{' '}
              <input
                class="input-search-realtime"
                type="text"
                onKeyUp$={(ev) => {
                  input.searchInput = (ev.target as HTMLInputElement).value;
                  url.searchParams.set('q', input.searchInput);
                }}
                value={input.searchInput}
                placeholder={url.searchParams.get('q') || '...'}
              />{' '}
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
                        or_sc +
                        '&or-or=' +
                        event.target.value +
                        or_ly
                    )
                  }
                >
                  <option value="newest">Llegadas más recientes</option>
                  <option value="lowest">Precio: Bajo a Alto</option>
                  <option value="highest">Precio: Alto a Bajo</option>
                  <option value="toprated" selected>
                    Ratings positivos
                  </option>
                </select>
                <DouveryArrowDown size="14px" />
              </div>{' '}
              <div class="container-button-view-layout">
                <button
                  class="button-1"
                  onClick$={() => (
                    number.setNumber == 1
                      ? (number.setNumber = 2)
                      : (number.setNumber = 1),
                    navigate(
                      url.pathname +
                        `?q=${url.searchParams.get('q')}` +
                        or_c +
                        or_sc +
                        `&or-ly=${number.setNumber}`
                    )
                  )}
                >
                  {layout === '1' ? (
                    <div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2788 11.2002C17.0888 11.2002 16.8988 11.1302 16.7488 10.9802C16.4588 10.6902 16.4588 10.2102 16.7488 9.9202L19.9388 6.7302L16.7488 3.54019C16.4588 3.25019 16.4588 2.7702 16.7488 2.4802C17.0387 2.1902 17.5187 2.1902 17.8087 2.4802L21.5288 6.20023C21.6688 6.34023 21.7488 6.5302 21.7488 6.7302C21.7488 6.9302 21.6688 7.12022 21.5288 7.26022L17.8087 10.9802C17.6587 11.1202 17.4688 11.2002 17.2788 11.2002Z"
                          fill="#292D32"
                        />
                        <path
                          d="M21 7.47998H3C2.59 7.47998 2.25 7.13998 2.25 6.72998C2.25 6.31998 2.59 5.97998 3 5.97998H21C21.41 5.97998 21.75 6.31998 21.75 6.72998C21.75 7.13998 21.41 7.47998 21 7.47998Z"
                          fill="#292D32"
                        />
                        <path
                          d="M6.71997 21.75C6.52997 21.75 6.34 21.68 6.19 21.53L2.46997 17.81C2.32997 17.67 2.25 17.48 2.25 17.28C2.25 17.08 2.32997 16.89 2.46997 16.75L6.19 13.03C6.48 12.74 6.96 12.74 7.25 13.03C7.54 13.32 7.54 13.8 7.25 14.09L4.06 17.28L7.25 20.4699C7.54 20.7599 7.54 21.24 7.25 21.53C7.11 21.68 6.91997 21.75 6.71997 21.75Z"
                          fill="#292D32"
                        />
                        <path
                          d="M21 18.02H3C2.59 18.02 2.25 17.68 2.25 17.27C2.25 16.86 2.59 16.52 3 16.52H21C21.41 16.52 21.75 16.86 21.75 17.27C21.75 17.68 21.41 18.02 21 18.02Z"
                          fill="#292D32"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div>
                      {' '}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4493 7.46997C10.2593 7.46997 10.0692 7.4 9.91922 7.25L6.72922 4.06L3.53922 7.25C3.24922 7.54 2.76922 7.54 2.47922 7.25C2.18922 6.96 2.18922 6.48 2.47922 6.19L6.19925 2.46997C6.33925 2.32997 6.52922 2.25 6.72922 2.25C6.92922 2.25 7.11925 2.32997 7.25925 2.46997L10.9792 6.19C11.2692 6.48 11.2692 6.96 10.9792 7.25C10.8292 7.4 10.6392 7.46997 10.4493 7.46997Z"
                          fill="#292D32"
                        />
                        <path
                          d="M6.73047 21.75C6.32047 21.75 5.98047 21.41 5.98047 21V3C5.98047 2.59 6.32047 2.25 6.73047 2.25C7.14047 2.25 7.48047 2.59 7.48047 3V21C7.48047 21.41 7.14047 21.75 6.73047 21.75Z"
                          fill="#292D32"
                        />
                        <path
                          d="M17.28 21.7497C17.08 21.7497 16.89 21.6698 16.75 21.5298L13.03 17.8097C12.74 17.5197 12.74 17.0397 13.03 16.7497C13.32 16.4597 13.8 16.4597 14.09 16.7497L17.28 19.9397L20.4699 16.7497C20.7599 16.4597 21.24 16.4597 21.53 16.7497C21.82 17.0397 21.82 17.5197 21.53 17.8097L17.81 21.5298C17.67 21.6698 17.47 21.7497 17.28 21.7497Z"
                          fill="#292D32"
                        />
                        <path
                          d="M17.2695 21.75C16.8595 21.75 16.5195 21.41 16.5195 21V3C16.5195 2.59 16.8595 2.25 17.2695 2.25C17.6795 2.25 18.0195 2.59 18.0195 3V21C18.0195 21.41 17.6895 21.75 17.2695 21.75Z"
                          fill="#292D32"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <Resource
            value={prodcureducer}
            onPending={() => <div class="loader"></div>}
            onRejected={(error) => <>Error: {error.message}</>}
            onResolved={(products) => (
              <>
                {' '}
                <ul>
                  {products.length === 0 ? (
                    <p>No hay productos para mostrar.</p>
                  ) : (
                    <ul
                      class={
                        layout == '2'
                          ? 'container-product-layout-grid'
                          : 'container-product-layout-vert'
                      }
                    >
                      {products.map((product: any) => (
                        <>
                          <li key={product.id}>
                            {url.searchParams.get('or-c') === 'books' ? (
                              <Card2S product={product} />
                            ) : layout == '2' ? (
                              <Card3S product={product} />
                            ) : (
                              <Card1S product={product} />
                            )}
                          </li>
                        </>
                      ))}
                    </ul>
                  )}
                </ul>
              </>
            )}
          />

          <div class="pagination">
            <button
              disabled={store.count == 1 || store.count == 0}
              onClick$={() =>
                navigate(
                  url.pathname +
                    `?q=${url.searchParams.get('q')}` +
                    or_c +
                    or_p +
                    `&or-page=${store.count--}`
                )
              }
              class="prev"
            >
              &#8249; Anterior
            </button>
            <a href="#" class="active">
              {store.count}
            </a>

            <button
              disabled={store.count === 3}
              onClick$={() =>
                navigate(
                  url.pathname +
                    `?q=${url.searchParams.get('q')}` +
                    or_c +
                    or_p +
                    `&or-page=${store.count++}`
                )
              }
              class="next"
            >
              Siguiente &#8250;
            </button>
          </div>
        </div>
      </div>
      <div class="container-random-product">
        <p class="ps-sr1">Puede que te interesen </p>
        <Carousel1 styleCard={4} product={state.productResults} />
      </div>
    </div>
  );
});
export const head: DocumentHead = ({ url }) => {
  const query = url.searchParams.get('q') || '';
  return {
    title: `Douvery: ${query}`,
    meta: [
      {
        name: 'description',
        content: '',
      },
      {
        name: 'id',
        content: '',
      },
    ],
  };
};
