import { component$, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './card-3-s.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';

export const Card3SCART = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
 const isDatePassed = useStore({setIsDatePassed:false})
  useVisibleTask$(() => {
    setInterval(() => {
     const today = new Date();
    const reminder = new Date(product.reminderDate);
     if (today > reminder) {
      isDatePassed.setIsDatePassed=true;
    }
    });
    return () => {
    isDatePassed.setIsDatePassed;
    };
  });
  console.log(product.reminderDate);
  return (
    <div class="container-all">
      <div class="card">
        <img src={product.images} alt="Product Image" class="product-image" />
        <div class="product-info">
          <a href={`/v//${product.dui}`}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>{' '} <div class={`date ${isDatePassed ? 'date-passed' : 'date-not-passed'}`}>
          {      product.reminderDate}
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
        </div>
        
      </div>
    </div>
  );
});
