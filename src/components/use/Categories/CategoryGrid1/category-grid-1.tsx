import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-grid-1.css?inline';
export const CategoryGrid1 = component$(({ nameCategorie }: any) => {
  useStylesScoped$(styles);
  const categories = [
    {
      name: 'Categoría 1',
      image: 'https://example.com/image1.jpg',
    },
    {
      name: 'Categoría 2',
      image: 'https://example.com/image2.jpg',
    },
  ];

  return (
    <div class="grid-container">
      {categories
        .filter((category) => category.name === nameCategorie)
        .map((category) => (
          <div key={category.name} class="grid-item">
            <h3>{category.name}</h3>
            <img src={category.image} alt={category.name} />
          </div>
        ))}
    </div>
  );
});
