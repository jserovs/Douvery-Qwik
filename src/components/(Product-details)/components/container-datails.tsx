import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-datails.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { DouveryCart } from '~/components/icons/cart';
import { DouveryPayIconBTC } from '~/components/icons/pay-icon-btc';

export default component$(({ props }: any) => {
  useStylesScoped$(styles);
  //*MOSTRAR TOTAL DE RATING ( 5 , 1 ,2)
  let totalRating = 0.0;
  for (let i = 0; i < props.ratings.length; i++) {
    totalRating = props.ratings[i].rating;
  }

  //*CALCULAR EL DESCUENTO
  const discount = (props.price * props.discount) / 100;
  const price_discount = props.price - discount;

  return (
    <>
      <div class="super-container">
        <div class="container-NavAggPayProduct-table-mobiles">
          <div class="rating-table-mobiles">
            {' '}
            <div class="rating-ct-ratig">
              ({totalRating}) {props.ratings.length}
            </div>
          </div>
          <div class="price-table-mobiles">
            <h5 class="aviso-ahora">
              {props.discount === 0 ? <>Precio :</> : <>Ahora :</>}
            </h5>
            <size-w class="size-w-10" />
            <h4>
              {' '}
              $
              {props.discount === 0 ? (
                <>{props.price.toFixed(2)}</>
              ) : (
                <>{price_discount.toFixed(2)}</>
              )}
            </h4>
          </div>
          {props.discount === 0 ? (
            ''
          ) : (
            <>
              <div class="price-descount-table-mobiles">
                <h5 class="tach price-tach"> ${props.price.toFixed(2)} </h5>
                <size-w class="size-w-10" />
                <h6 class="porce">
                  -%
                  {props.discount}
                </h6>
              </div>
            </>
          )}
          {props.discount === 0 ? (
            <>
              <button class="button-envio">{'  Envio gratis'}</button>{' '}
            </>
          ) : (
            <></>
          )}
        </div>
        <div class="container-NavAggPayProduct-web">
          <Stars props={totalRating} />{' '}
          <div class="ct-ratig">
            ({totalRating}) {props.ratings.length}
          </div>{' '}
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          {props.discount === 0 ? (
            ''
          ) : (
            <>
              <div class="titles-of"> Antes: </div>
              <size-w class="size-w-10" />{' '}
              <h5 class="tach price-tach "> ${props.price.toFixed(2)}</h5>
              <size-w class="size-w-10" />
              <size-w class="size-w-10" />
              <div class="ctr-porce">
                <h6 class="porce  ">
                  -%
                  {props.discount}
                </h6>
              </div>
              <size-w class="size-w-10" />
            </>
          )}
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          <div class="titles-of">Precio :</div>
          <size-w class="size-w-10" />{' '}
          <h4 class="font-price ">
            <>$</>
            {props.discount === 0 ? (
              <>{props.price.toFixed(2)}</>
            ) : (
              <>{price_discount.toFixed(2)}</>
            )}
          </h4>{' '}
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          <button class="button-envio">Envio gratis</button>
          <size-w class="size-w-10" />
          {props.quantity <= 1 ? (
            <></>
          ) : (
            <>
              <size-w class="size-w-10" />{' '}
              <button class="buttonCart">
                <DouveryCart size="20px" /> Añadir al carrito
              </button>
              <size-w class="size-w-10" />{' '}
              <button class="buttonPay">
                {' '}
                <DouveryPayIconBTC size="20" /> Pagar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
});
