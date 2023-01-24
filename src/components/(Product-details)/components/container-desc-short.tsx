import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-desc-short.css?inline';
export const ContainerDescriptionShort = component$(({ props }: any) => {
  useStylesScoped$(sryles);

  return (
    <iframe
      title={'Descritpion: ' + props.description}
      srcDoc={props.description}
    />
  );
});
