import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-hrs-butros.css?inline';
import { DouveryHeart } from '~/components/icons/heart';
import { DouveryInfo } from '~/components/icons/info';
import { ContainerPoputCategory } from './components/popupCategory';
export const ContainerButtonExtr = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crtr-brst-csr">
      <div class="q-r-pred etqsitms">
        <span>
          <DouveryHeart size="15px" />
          Add to Wishlist
        </span>
        <div class="se-pr">|</div>
        <span>
          <DouveryInfo size="15px" /> Suggest information
        </span>
        <div class="se-pr">|</div>
        <span>
          {props.ratings.length == 0 ? <>Sin</> : props.ratings.length}{' '}
          calificaciones
        </span>
        <div class="se-pr">|</div>
        <span>Sin preguntas Respondidas</span>
      </div>
      <div class="opcs">
        {' '}
        <p class="ps-sr1">Puede ver algunas</p>
        <ContainerPoputCategory props={props} title="Opciones" />
      </div>
    </div>
  );
});
