import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './css/container-datails.css?inline';

import { ButtonDetailContainer } from './container-button-details';

import numeral from 'numeral';
import { useGetCurrentUser } from '~/routes/layout';
import { useLocation } from '@builder.io/qwik-city';

export const DetailContainer = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const quantityCart = useStore({ setQuantityCart: '1' });

  //*CALCULAR EL DESCUENTO
  const discount = (props.price * props.discount) / 100;
  const price_discount = props.price - discount;
  let priceDecreasePercentage;
  if (props.priceHistory && props.priceHistory.length >= 2) {
    const currentPrice =
      props.priceHistory[props.priceHistory.length - 1].price;
    let previousPriceIndex = props.priceHistory.length - 2;
    while (
      previousPriceIndex >= 0 &&
      props.priceHistory[previousPriceIndex].price === currentPrice
    ) {
      previousPriceIndex--;
    }

    if (previousPriceIndex >= 0) {
      const previousPrice = props.priceHistory[previousPriceIndex].price;
      const priceDifference = previousPrice - currentPrice;
      priceDecreasePercentage = (priceDifference / previousPrice) * 100;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locateCurrency = 'US';
  const formCurrency = '$0,0.00';
  const tooltip = useStore({
    setTooltip: false,
  });
  useVisibleTask$(() => {
    const showTimer = setTimeout(() => {
      tooltip.setTooltip = true;
    }, 2000);

    const hideTimer = setTimeout(() => {
      tooltip.setTooltip = false;
    }, 25000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  });
  const user = useGetCurrentUser().value;
  const { url } = useLocation();
  return (
    <>
      <div class="super-container">
        <div class="container-NavAggPayProduct-table-mobiles">
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
          <div class="session_price">
            <div class="titles-of">Precio :</div>
            <size-w class="size-w-10" />{' '}
            <div class="tooltip-wrapper">
              <h4 class="font-price">
                {props.discount === 0 ? (
                  <>{numeral(props.price).format(formCurrency)}</>
                ) : (
                  <div>{numeral(price_discount).format(formCurrency)}</div>
                )}
              </h4>
              {user?.id ? (
                <></>
              ) : (
                <>
                  {' '}
                  {tooltip.setTooltip && (
                    <div
                      class={`tooltip-content ${
                        tooltip.setTooltip ? 'show' : 'hide'
                      }`}
                    >
                      <span class="tooltip-arrow"></span>
                      <p>Si quieres ver el historial de precios</p>
                      <a
                        href={'/a/login?rr=' + url.pathname + url.search}
                        class="login-button"
                      >
                        Iniciar Sesión.
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
            <size-w class="size-w-10" />
            {props.discount === 0 ? (
              ''
            ) : (
              <>
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
                      {/* {props.discount < 20 ? (
                        ''
                      ) : (
                        <> SAVE {numeral(discount).format(formCurrency)}</>
                      )} */}
                    </h6>
                  </div>
                </div>
                <size-w class="size-w-10" />
                <size-w class="size-w-10" />
                <div class="titles-of"> Antes: </div>
                <size-w class="size-w-10" />{' '}
                <h5 class="tach price-tach ">
                  {' '}
                  {numeral(props.price).format(formCurrency)}
                </h5>
                <size-w class="size-w-10" />
              </>
            )}
            <size-w class="size-w-10" />
            <size-w class="size-w-10" />
            <size-w class="size-w-10" />
          </div>

          {user?.id ? (
            <div class="content_priceHistory">
              <a href={'/price-history/' + props.dui}>
                <p>
                  Price history
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1667 5.83333V13.0467L13.3133 16.1933L14.7 13.8067L12.8333 11.9533V5.83333H10.1667ZM23.5 12.5C23.5 9.3174 22.2357 6.26516 19.9853 4.01472C17.7348 1.76428 14.6826 0.5 11.5 0.5C7.72667 0.5 4.36667 2.26 2.16667 4.98V1.83333H-0.5V9.83333H7.5V7.16667H3.84667C4.70663 5.93359 5.85135 4.92614 7.18368 4.2298C8.51602 3.53346 9.99667 3.16877 11.5 3.16667C16.6467 3.16667 20.8333 7.35333 20.8333 12.5H23.5ZM9.98 21.7133C5.99333 21.06 2.84667 17.8467 2.27333 13.8333H-0.42C0.246667 19.8333 5.32667 24.5 11.5 24.5H11.5933L9.98 21.7133Z"
                      fill="black"
                    />
                    <path
                      d="M15.7585 24V15.2727H19.2017C19.8636 15.2727 20.4276 15.3991 20.8935 15.652C21.3594 15.902 21.7145 16.25 21.9588 16.696C22.206 17.1392 22.3295 17.6506 22.3295 18.2301C22.3295 18.8097 22.2045 19.321 21.9545 19.7642C21.7045 20.2074 21.3423 20.5526 20.8679 20.7997C20.3963 21.0469 19.8253 21.1705 19.1548 21.1705H16.9602V19.6918H18.8565C19.2116 19.6918 19.5043 19.6307 19.7344 19.5085C19.9673 19.3835 20.1406 19.2116 20.2543 18.9929C20.3707 18.7713 20.429 18.517 20.429 18.2301C20.429 17.9403 20.3707 17.6875 20.2543 17.4716C20.1406 17.2528 19.9673 17.0838 19.7344 16.9645C19.5014 16.8423 19.206 16.7812 18.848 16.7812H17.6037V24H15.7585Z"
                      fill="black"
                    />
                  </svg>
                </p>
                {priceDecreasePercentage && (
                  <div class="priceDecrease">
                    <span class="tooltip_arrow_decrease"></span>
                    <p>
                      {' '}
                      {priceDecreasePercentage.toFixed(2)}% más barato que la
                      última vez.
                    </p>
                  </div>
                )}
              </a>
            </div>
          ) : (
            ''
          )}
          <div class="session_buttons">
            {props.quantity <= 1 ? (
              <div class="no-stock">
                <div class="circle"></div>
                <h5 class="title-prtsea">Articulo agotado</h5>
              </div>
            ) : (
              <div class="content_qty">
                <span>Qty:</span>
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
              </div>
            )}
            <div class="div-button">
              {' '}
              <ButtonDetailContainer
                product={props}
                quantity={quantityCart.setQuantityCart}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
