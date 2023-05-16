import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Card_Category_1 } from '../cards/category/category-1/category-1';
import styles from './carousel-all.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class="container-all">
        <Card_Category_1 name="Electrónica Y Accesorios" images={[
          'https://res.cloudinary.com/douvery/image/upload/v1666290770/samsung%20galaxy%20s22/chzioq3p34ksagujqmfe.webp',

          'https://res.cloudinary.com/douvery/image/upload/v1666290088/iPhone%2014%20Pro%20Max/hsskqod9szag9ohfwv6k.webp'

        ]} />

      </div>
    </>
  );
});
