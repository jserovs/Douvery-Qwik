import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './card-3-s.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
import { useLocation } from '@builder.io/qwik-city';

export const Card3SCART = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const isDatePassed = useStore({ setIsDatePassed: false });
  const { url } = useLocation();
  useVisibleTask$(({ track }) => {
    track(() => url.searchParams);
    setInterval(() => {
      const today = new Date();
      const reminder = new Date(product.reminderDate);
      if (today > reminder) {
        isDatePassed.setIsDatePassed = true;
      }
    });
    return () => {
      isDatePassed.setIsDatePassed;
    };
  });

  return (
    <div class="container-all">
      <div class="card">
        <img src={product.images} alt="Product Image" class="product-image" />
        <div class="product-info">
          <a href={`/v//${product.dui}`}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} /> {product.notification}
            </h2>
          </a>{' '}
          {product.notification === true ? (
            <div class="container-notification-product">
              {' '}
              <p>Notificacion activada para: </p>
              <div
                class={`date ${
                  isDatePassed.setIsDatePassed
                    ? 'date-passed'
                    : 'date-not-passed'
                }`}
              >
                {product.reminderDate !== 0 &&
                  new Date(product.reminderDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
              </div>
            </div>
          ) : (
            ''
          )}
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
          <div class="container-status-notification-product">
            {product.notification === true ? <p>Notificacion activada</p> : ''}
            {product.payAutomatic === true ? (
              <>
                {' '}
                <div class="ctr-opa">|</div>
                <p>Compra automatica activada</p>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
