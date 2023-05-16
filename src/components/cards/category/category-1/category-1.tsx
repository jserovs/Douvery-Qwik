import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './category-1.css?inline';
export const Card_Category_1 = component$(({ name, images }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="category-card">
      <div class="category-info">
        <h1>{name}</h1>
      </div>

      <div class="category-img">
        {images.map((image: any, index: any) => {
          return <img src={image} key={index} />;
        })}
      </div>
    </div>
  );
});
