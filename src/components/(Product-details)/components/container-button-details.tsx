import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-button-details.css?inline';

import { addToCart } from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { DouveryCheckMark } from '~/components/icons/checkMark';

export const ContainerButtonDetails = component$(
  ({ product, quantity }: any) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const isLoader = useStore({
      setIsLoader: false
    })
    const AddCart = $(() => {
     const result = addToCart({
        dui: product.dui,
        quantity: quantity,
      });
       if (result.success) {
        isLoader.setIsLoader = true
        nav('/v/cart/');
      
      } else {
        console.error('Error, ', result.error);
      }
    
    });

    return (
      <div>
        <div class="button-lapto">
          <size-w class="size-w-10" />
          {product.quantity <= 1 ? (
            <></>
          ) : (
            <>
              <size-w class="size-w-10" />{' '}
              <button class="buttonCart" onClick$={AddCart}>
               {isLoader.setIsLoader == true ? (
              <div class='check' > <DouveryCheckMark size='15px' /></div>
            ) :   <></>} Agregar al carrito
              </button>
              <size-w class="size-w-10" />{' '}
              <button class="buttonPay"> Pagar</button>
            </>
          )}
        </div>
        <div class="crt-button-mobiles">
          <div class="button-mobiles">
            {product.quantity <= 1 ? (
              <></>
            ) : (
              <>
                <button class="buttonCart" onClick$={AddCart}>
                  {isLoader.setIsLoader == true ? (
              <div class='loader' ></div>
            ) :   <></>} Agregar al carrito
                </button>
                <size-w class="size-w-10" />{' '}
                <button class="buttonPay"> Pagar</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);
