import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import styles from './filter-product-1.css?inline';
export const Filter_Product1 = component$(({ subCategories }: any) => {
  useStylesScoped$(styles);

  const loc = useLocation();
  return (
    <>
      <div class="filter-section-body">
        <div>
          <h3>{loc.params.categorie}</h3>
          {subCategories?.map((c: any, i: number) => (
            <div class="container-sub-category" key={i}>
              <div class="item" key={i}>
                <DouveryRight3
                  color={
                    loc.url.searchParams.get('or-sc') === c ? '#256D85' : ''
                  }
                  size="14px"
                />
                <label
                  class={
                    loc.url.searchParams.get('or-sc') === c
                      ? 'active-undeline'
                      : ''
                  }
                >
                  <Link href={loc.url.pathname + `?or-sc=${c}`}>{c}</Link>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Resto del código */}
      </div>
    </>
  );
});
