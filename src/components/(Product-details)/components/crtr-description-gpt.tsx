import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description-gpt.css?inline';
export const BookDescriptionContainer = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <strong class="hs-sr1">Descripcion del libro</strong>
      <p class="ps-sr1">{props.booksDescription}</p>
    </div>
  );
});
