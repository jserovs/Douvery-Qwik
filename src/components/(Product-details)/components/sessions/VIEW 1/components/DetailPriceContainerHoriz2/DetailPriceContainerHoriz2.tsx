import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './DetailPriceContainerHoriz2.css?inline';

import numeral from 'numeral';
import { UseStarRating } from '~/components/use/ratings/useRatingHover/useRatingHover';
import { ButtonDetailContainer } from '~/components/(Product-details)/components/container-button-details';

export const DetailPriceContainerHoriz2 = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const quantityCart = useStore({ setQuantityCart: '1' });

  //*CALCULAR EL DESCUENTO
  const discount = (props.price * props.discount) / 100;
  const price_discount = props.price - discount;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locateCurrency = 'US';
  const formCurrency = '$0,0.00';

  return (
    <>
      <div class="container__lastprice__porce">
        <div class="container__ratings">
          <UseStarRating product={props} size="20" />
        </div>
        <div class="ctr-opa"> |</div>
        {props.discount === 0 ? (
          ''
        ) : (
          <>
            <div class="last__price">
              <div class="titles-of"> Antes: </div>

              <h5 class="tach price-tach ">
                {' '}
                {numeral(props.price).format(formCurrency)}
              </h5>
            </div>
            <div class="ctr-opa"> |</div>
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
            <div class="ctr-opa"> |</div>
          </>
        )}
        <div class="price">
          <div class="titles-of">Precio :</div>
          <h4 class="font-price ">
            {props.discount === 0 ? (
              <>{numeral(props.price).format(formCurrency)}</>
            ) : (
              <div>{numeral(price_discount).format(formCurrency)}</div>
            )}
          </h4>{' '}
        </div>
      </div>
      <div class="super-container">
        <div class="container-NavAggPayProduct-table-mobiles">
          <div class="rating-table-mobiles">
            <UseStarRating product={props} size="16" />
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
          <size-w class="size-w-10" />
          <div class="div-button">
            {' '}
            {props.quantity <= 1 ? (
              <div class="no-stock">
                <div class="circle"></div>
                <h5 class="title-prtsea">Articulo agotado</h5>
              </div>
            ) : (
              <div class="div-input-sertts">
                <div class="select-input-cart">
                  <select
                    value={quantityCart.setQuantityCart}
                    onChange$={(event) =>
                      (quantityCart.setQuantityCart = event.target.value)
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            )}
            <ButtonDetailContainer
              product={props}
              quantity={quantityCart.setQuantityCart}
            />
          </div>
        </div>
      </div>
    </>
  );
});
