import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description-gpt.css?inline';
export const ContainerDescriptionGPT = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <h5>Descripcion minima</h5>
      <p>{props.booksDescription}</p>
    </div>
  );
});
