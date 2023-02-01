import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description.css?inline';
export const ContainerDescription = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <h5>Descripcion</h5>
      <p>{props.description}</p>
    </div>
  );
});
