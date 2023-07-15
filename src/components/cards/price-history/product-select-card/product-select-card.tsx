import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './product-select-card.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { TextCL } from '~/components/use/textCL/textCL';
import { UseNumberOneCategory } from '~/components/use/numberOne/numberOneCategory';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { UseProductDetailsLink } from '~/services/fuction';
import { ButtonDetailContainer } from '~/components/(Product-details)/components/container-button-details';

// import { ButtonCardHover } from '~/components/use/bropdown-button-cart-fast-pay/button-card/button-card-hover';
export const CardProductSelect1 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const quantityCart = useStore({ setQuantityCart: '1' });

  return (
    <div class="container-all">
      <div class="card">
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt="Product Image"
          class="product-image"
        />
        <div class="product-info">
          <a href={UseProductDetailsLink(product, ref)}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>
          <p class="product-description">{product.marca}</p>
          <UseNumberOneCategory product={product} />

          <div class="brt-irft-lapto">
            <strong class="hs-sr1">Estado:</strong>{' '}
            <p class="ps-sr1">{product.item_condition}</p>
          </div>
          <div class="dsier-strs-lapto">
            {product.quantity <= 1 ? (
              <>
                <p class="exhausted-for ">Articulo agotado</p>
                <div class="bts-ds"> </div>
              </>
            ) : product.quantity <= 12 ? (
              <>
                <div>
                  <DouveryCheckMark size="16px" />
                  <p>Articulo disponible</p>
                </div>

                <size-w class="size-w-10" />
                <div class="minus-dolceid-alert-buty">
                  ¡Solo Queda(n) {product.quantity} unidades!
                </div>
              </>
            ) : (
              <>
                <div class="art-stock">
                  <DouveryCheckMark size="16px" />
                  <p>Articulo disponible</p>
                </div>
              </>
            )}
          </div>

          <div class="product-price">
            {product.discount > 0 ? (
              <>
                {' '}
                <UsePrice price={discoun} />
                <div class="ctr-opa">|</div>
                <div class="price-t  tach">
                  {' '}
                  <UsePrice price={product.price} />
                </div>
              </>
            ) : (
              <>
                <UsePrice price={product.price} />
              </>
            )}{' '}
          </div>
          <div class="session_buttons">
            {product.quantity <= 1 ? (
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
                product={product}
                quantity={quantityCart.setQuantityCart}
                vert={true}
              />
            </div>
          </div>
        </div>

        {/* <div class="container-hover-button">
          {' '}
          <ButtonCardHover product={product} />
        </div> */}
      </div>
    </div>
  );
});
