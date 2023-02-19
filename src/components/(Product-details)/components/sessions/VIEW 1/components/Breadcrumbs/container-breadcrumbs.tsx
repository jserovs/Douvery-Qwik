import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-breadcrumbs.css?inline';
import { DouveryRight3 } from '~/components/icons/arrow-right-3';
export const ContainerBreadcrumbs = component$(({ product }: any) => {
  useStylesScoped$(styles);
  product;
  return (
    <nav aria-label="breadcrumbs">
      <ol class="breadcrumb-container">
        <li>
          <a href="/">Inicio</a>
        </li>
        <div class="drs">
          <DouveryRight3 size="12" color="#00000038" />
        </div>
        <li>
          <a href="/electronics">{product.category}</a>
        </li>
        <div class="drs">
          {' '}
          <DouveryRight3 size="12" color="#00000038" />
        </div>
        <li>
          <a href="/electronics/headphones">{product.subCategory}</a>
        </li>
        <div class="drs">
          {' '}
          <DouveryRight3 size="12" color="#00000038" />
        </div>
        <li class="active" title={product.name + ' ( Viendo ahora ) '}>
          <p>{product.name}</p>
        </li>
      </ol>
    </nav>
  );
});
