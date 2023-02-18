import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-breadcrumbs.css?inline';
export const ContainerBreadcrumbs = component$(({ product }: any) => {
  useStylesScoped$(styles);
  product;
  return (
    <nav aria-label="breadcrumbs">
      <ol class="breadcrumb-container">
        <li>
          <a href="/">Inicio</a>
        </li>
        <div class="drs">/</div>
        <li>
          <a href="/electronics">{product.category}</a>
        </li>
        <div class="drs">/</div>
        <li>
          <a href="/electronics/headphones">{product.subCategory}</a>
        </li>
        <div class="drs">/</div>
        <li class="active">
          <p>{product.name}</p>
        </li>
      </ol>
    </nav>
  );
});
