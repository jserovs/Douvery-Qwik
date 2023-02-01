import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-hrs-butros.css?inline';
import { DouveryHeart } from '~/components/icons/heart';
import { DouveryInfo } from '~/components/icons/info';
export const ContainerButtonExtr = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crtr-brst-csr">
      <div class="whastlit etqsitms">
        <span>
          <DouveryHeart size="15px" />
          Add to Wishlist
        </span>
      </div>
      <div class="infor-srgrs etqsitms">
        <span>
          <DouveryInfo size="15px" /> Suggest information
        </span>
      </div>
      <div class="q-r-pred etqsitms">
        <span>
          {props.ratings.length == 0 ? <>Sin</> : props.ratings.length}{' '}
          calificaciones
        </span>
        <h6>|</h6>
        <span>Sin preguntas Respondidas</span>
      </div>
    </div>
  );
});
