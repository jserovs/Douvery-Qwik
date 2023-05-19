import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';

import styles from './douveryExtend1.css?inline';
import { UsePrice } from '~/components/use/price/price';
export const CardDouveryExtend1 = component$(() => {
  useStylesScoped$(styles);

  const showLoader = useStore({ setShowLoader: true });

  useVisibleTask$(() => {
    const timer = setInterval(() => {
      showLoader.setShowLoader = false;
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <>
      {showLoader.setShowLoader ? (
        <>
          {' '}
          <div class="loader"></div>
        </>
      ) : (
        <>
          <br />
          <div class="container-interes">
            <p class="ps-sr1">Puede que te interese </p>
          </div>
          <div class="card-douveryextend">
            <img
              src="https://res.cloudinary.com/douvery/image/upload/v1684492886/buwaumgmxfc1uz43jcux.png"
              alt=""
            />

            <div class="btt-prc">
              {' '}
              <UsePrice price={2.55} />
              /mo <button>Agregar</button>
            </div>
          </div>
          <div class="show-more">
            <a href="/s/DouveryExtend">Saber mas</a>
          </div>
        </>
      )}
    </>
  );
});
