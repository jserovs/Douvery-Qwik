import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-datails.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { ContainerButtonDetails } from './container-button-details';
import { ContainerInputCartPay } from './container-input-cart-pay';
import numeral from 'numeral';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locateCurrency = 'US';
  const formCurrency = '$0,0.00';
  return (
    <>
      <div class="super-container">
        <div class="container-NavAggPayProduct-table-mobiles">
          <div class="rating-table-mobiles">
            <Stars size="16" rating={totalRating} />{' '}
            <div class="rating-ct-ratig">
              ({totalRating}) {props.ratings.length}
            </div>
          </div>
          <div class="price-table-mobiles">
            <h5 class="title-prtsea">
              <>Precio :</>
            </h5>
            <size-w class="size-w-10" />
            <h4 class="font-price-mobiles">
              {' '}
              {props.discount === 0 ? (
                <>{numeral(props.price).format(formCurrency)}</>
              ) : (
                <>{numeral(price_discount).format(formCurrency)}</>
              )}
            </h4>
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
        </div>

        <div class="container-NavAggPayProduct-web">
          <Stars rating={totalRating} />{' '}
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
              <h5 class="tach price-tach ">
                {' '}
                {numeral(props.price).format(formCurrency)}
              </h5>
              <size-w class="size-w-10" />
              <size-w class="size-w-10" />
              <div class="ctr-p-s">
                {' '}
                <div
                  class={
                    props.discount < 20 ? 'ctr-porce' : 'ctr-porce ctr-p-red '
                  }
                >
                  <h6 class="porce  ">
                    -%
                    {props.discount}
                  </h6>
                </div>
                {props.discount < 20 ? (
                  ''
                ) : (
                  <div class="ctr-save-pr">
                    SAVE {numeral(discount).format(formCurrency)}
                  </div>
                )}
              </div>
              <size-w class="size-w-10" />
            </>
          )}
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          <div class="titles-of">Precio :</div>
          <size-w class="size-w-10" />{' '}
          <h4 class="font-price ">
            {props.discount === 0 ? (
              <>{numeral(props.price).format(formCurrency)}</>
            ) : (
              <div>{numeral(price_discount).format(formCurrency)}</div>
            )}
          </h4>{' '}
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          <size-w class="size-w-10" />
          {props.quantity <= 1 ? (
            <div class="no-stock">
              <div class="circle"></div>
              <h5 class="title-prtsea">Articulo agotado</h5>
            </div>
          ) : (
            <div class="div-input-sertts">
              <ContainerInputCartPay quantity={1} />
            </div>
          )}
          <div class="div-button">
            {' '}
            <ContainerButtonDetails props={props} />
          </div>
        </div>
      </div>
    </>
  );
});
