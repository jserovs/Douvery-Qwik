import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-datails.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { ContainerButtonDetails } from './container-button-details';

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
            <Stars props={totalRating} />{' '}
            <div class="rating-ct-ratig">
              ({totalRating}) {props.ratings.length}
            </div>
          </div>

          {props.discount === 0 ? (
            <>
              {' '}
              <div class="shw-free">Envio gratis</div>
            </>
          ) : (
            <>
              <div class="price-descount-table-mobiles">
                <div class="ctr-porce-mobiles">
                  <h6 class="porce-mobiles  ">
                    -%
                    {props.discount}
                  </h6>
                </div>
              </div>
            </>
          )}
          <div class="price-table-mobiles">
            <h5 class="title-prtsea">
              {props.discount === 0 ? <>Precio :</> : <>Ahora :</>}
            </h5>
            <size-w class="size-w-10" />
            <h4 class="font-price-mobiles">
              {' '}
              $
              {props.discount === 0 ? (
                <>{props.price.toFixed(2)}</>
              ) : (
                <>{price_discount.toFixed(2)}</>
              )}
            </h4>
          </div>
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
          <ContainerButtonDetails props={props} />
        </div>
      </div>
    </>
  );
});
