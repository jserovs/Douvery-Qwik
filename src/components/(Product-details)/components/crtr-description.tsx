import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/crtr-description.css?inline';
export const ContainerDescription = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crrtr-srtrt">
      <hs-sr1>Descripcion</hs-sr1>
      <div class="descr">
        <p>{props.description}</p>
      </div>
    </div>
  );
});
