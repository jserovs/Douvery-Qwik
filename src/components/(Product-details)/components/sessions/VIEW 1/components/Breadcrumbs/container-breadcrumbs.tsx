import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-breadcrumbs.css?inline';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
export const ContainerBreadcrumbs = component$(({ product }: any) => {
  useStylesScoped$(styles);
  product;
  return (
    <nav aria-label="breadcrumbs">
      <ul class="breadcrumb-container">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          {' '}
          <div class="drs">
            <DouveryRight3 size="12" color="#00000038" />
          </div>
        </li>
        <li>
          <a href="/electronics">{product.category}</a>
        </li>
        <li>
          <div class="drs">
            {' '}
            <DouveryRight3 size="12" color="#00000038" />
          </div>
        </li>

        <li>
          <a href="/electronics/headphones">{product.subCategory}</a>
        </li>
        <li>
          {' '}
          <div class="drs">
            {' '}
            <DouveryRight3 size="12" color="#00000038" />
          </div>
        </li>
        <li class="active" title={product.name + ' ( Viendo ahora ) '}>
          <p>{product.name}</p>
        </li>
      </ul>
    </nav>
  );
});
