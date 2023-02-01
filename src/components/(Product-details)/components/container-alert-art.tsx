import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-alert-art.css?inline';

export const ContainerAlertArt = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <>
      {' '}
      {props.org === true ? (
        <div class="crtr-alert-prodc">
          {' '}
          <p>
            Al comprar este producto, estás ayudando a{' '}
            <span class="org">una organización benéfica</span>.{' '}
            <span class="prd-d">Saber mas</span>
          </p>
        </div>
      ) : (
        <></>
      )}{' '}
    </>
  );
});
