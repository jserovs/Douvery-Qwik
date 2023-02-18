import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description-gpt.css?inline';
export const ContainerDescriptionGPT = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <strong class="hs-sr1">Descripcion minima</strong>
      <p class="ps-sr1">{props.booksDescription}</p>
    </div>
  );
});
