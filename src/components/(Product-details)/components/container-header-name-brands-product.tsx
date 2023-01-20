import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-header-name-brands-product.css?inline';
import { DouveryCheckMark } from '~/components/icons/checkMark';
export const ContainerHeaderNameBrandProduct = component$(({ props }: any) => {
  useStylesScoped$(sryles);

  return (
    <div class="super-container-title-brand-product mobiles-title-brand">
      <div class="container-brand-product">
        <a href="/" aria-label={props.marca}>
          Visita {props.marca}
        </a>
      </div>
      <size-w class="size-w-10" />
      <div class="container-title-product">
        {' '}
        <h5>{props.name}</h5>
      </div>
      <div class="brt-irft-lapto">
        <h5>Estado : </h5> <h4>Nuevo</h4>
      </div>
      <div class="dsier-strs-lapto">
        {props.quantity <= 1 ? (
          <>
            <p class="exhausted-for ">Articulo agotado</p>
            <button>Notificarme cuando este disponible</button>
          </>
        ) : props.quantity <= 12 ? (
          <>
            <DouveryCheckMark size="20px" /> <p>Articulo disponible</p>
            <size-w class="size-w-10" />
            <button class="minus-dolceid-alert-buty">
              Quedan menos de 12 unidades
            </button>
          </>
        ) : (
          <>
            <DouveryCheckMark size="20px" /> <p>Articulo disponible</p>
          </>
        )}
      </div>
    </div>
  );
});
