import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description.css?inline';
export const ContainerDescription = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <h5>Descripcion</h5>
      <div class="descr">
        <p>{props.description}</p>
      </div>
    </div>
  );
});
