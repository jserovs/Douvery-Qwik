import { component$ } from '@builder.io/qwik';
import { CategoryGrid1 } from '~/components/use/Categories/CategoryGrid1/category-grid-1';

export default component$(() => {
  return (
    <div>
      <CategoryGrid1 nameCategorie="Categoría 1" />
    </div>
  );
});
