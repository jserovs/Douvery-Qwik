import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './card-comment-1.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
export const CardComment1 = component$(
  ({ buyTime, name, rating, comment, timePublic }: any) => {
    useStylesScoped$(style);
    return (
      <div class="ctr-box-user">
        <div class="crtr-avatar">
          <img
            src="https://www.ecured.cu/images/a/a1/Ejemplo_de_Avatar.png"
            alt="avatar-user"
          />
        </div>
        <div class="crt-ifr-crt">
          {' '}
          <div class="ctr-name-time">
            <hs-sr1>{name}</hs-sr1>
            <div>|</div>
            <p-sr1>{timePublic}</p-sr1> <div>|</div>
            <Stars color="#008080" rating={rating} />
          </div>
          <p-sr1>Producto comprando el {buyTime}</p-sr1>
          <div class="ctr-comment">
            <hs-sr1>{comment}</hs-sr1>
          </div>
        </div>
      </div>
    );
  }
);
