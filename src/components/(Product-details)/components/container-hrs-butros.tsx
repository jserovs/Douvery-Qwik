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
        <a href='/'>
          <DouveryHeart size="15px" />
          Add to Wishlist
        </a >
        <div class="se-pr">|</div>
        <a href='/'>
          <DouveryInfo size="15px" /> Suggest information
        </a >
        <div class="se-pr">|</div>
        <a href='/'>
          {props.ratings.length == 0 ? <>Sin</> : props.ratings.length}{' '}
          calificaciones
        </a >
        <div class="se-pr">|</div>
        <a  href='/' >Sin preguntas respondidas</a >
      </div>
      <div class="opcs">
        {' '}
        <p class="ps-sr1">Puede ver algunas</p>
        <ContainerPoputCategory props={props} title="Opciones" />
      </div>
    </div>
  );
});
